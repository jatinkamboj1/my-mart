const prisma = require("../prismaClient");
const { parseDecimal } = require("../utils/healper");
const { sendEmailInvoice } = require("../utils/mail/sender");

// const handlePaymentSuccess = async (paymentIntent) => {

//   let paymentData; // store for later use
// try {
//   await prisma.$transaction(async (tx) => {

//     const payment = await tx.payment.findUnique({
//       where: { paymentIntentId: paymentIntent.id },
//       include: { order: { include: { products: true } } },
//     });

//     if (!payment) return;
//     if (payment.status === "SUCCEEDED") return;

//     // STOCK DEDUCTION
//     for (const item of payment.order.products) {

//       if (item.productVariantId) {
//         const updated = await tx.productVariant.updateMany({
//           where: {
//             id: item.productVariantId,
//             stock: { gte: item.quantity }
//           },
//           data: { stock: { decrement: item.quantity } }
//         });

//         if (updated.count === 0)
//           throw new Error("Insufficient variant stock");
//       }

//       if (item.productId) {
//         const updated = await tx.product.updateMany({
//           where: {
//             id: item.productId,
//             stock: { gte: item.quantity }
//           },
//           data: { stock: { decrement: item.quantity } }
//         });

//         if (updated.count === 0)
//           throw new Error("Insufficient product stock");
//       }
//     }

//     // Update payment
//     const updatedPayment = await tx.payment.update({
//       where: { id: payment.id },
//       data: {
//         status: "SUCCEEDED",
//         chargeId: paymentIntent.latest_charge,
//         amountCaptured: parseDecimal(
//           paymentIntent.amount_received / 100
//         ),
//       },
//       include: { order: true }
//     });

//     await tx.paymentTransaction.create({
//       data: {
//         paymentId: payment.id,
//         type: "CHARGE",
//         status: "SUCCESS",
//         transactionId: paymentIntent.latest_charge,
//         amount: parseDecimal(
//           paymentIntent.amount_received / 100
//         ),
//         currency: paymentIntent.currency.toUpperCase(),
//       },
//     });

//     await tx.order.update({
//       where: { id: payment.orderId },
//       data: {
//         status: "CONFIRMED",
//         isPaid: true,
//       },
//     });

//     paymentData = updatedPayment; // store for after transaction
//   });
// } catch (error) {
//   console.log("Payment processing failed:", error.message);  
// }

//   // ✅ OUTSIDE transaction
//   try {
//     if (paymentData?.order?.email) {
//       await sendEmailInvoice(paymentData.order.email, paymentData.order);
//     }
//   } catch (error) {
//     console.log("Email failed but payment succeeded:", error.message);
//     // DO NOT throw → webhook must return 200
//   }
// };


// const handlePaymentFailed = async (paymentIntent) => {

//   await prisma.payment.updateMany({
//     where: { paymentIntentId: paymentIntent.id },
//     data: {
//       status: "FAILED",
//       failureReason:
//         paymentIntent.last_payment_error?.message || "Unknown error",
//     },
//   });

// };

// const handleRefund = async (charge) => {

//   await prisma.$transaction(async (tx) => {

//     const payment = await tx.payment.findFirst({
//       where: { chargeId: charge.id },
//       include: { order: { include: { products: true } } },
//     });

//     if (!payment) return;

//     const totalRefunded = parseDecimal(
//       charge.amount_refunded / 100
//     );

//     const isFull =
//       charge.amount_refunded === charge.amount;

//     /* 🔁 RESTOCK (ONLY FULL REFUND) */
//     if (isFull) {
//       for (const item of payment.order.products) {

//         if (item.productVariantId) {
//           await tx.productVariant.update({
//             where: { id: item.productVariantId },
//             data: { stock: { increment: item.quantity } }
//           });
//         }

//         if (item.productId) {
//           await tx.product.update({
//             where: { id: item.productId },
//             data: { stock: { increment: item.quantity } }
//           });
//         }
//       }
//     }

//     await tx.payment.update({
//       where: { id: payment.id },
//       data: {
//         amountRefunded: totalRefunded,
//         status: isFull
//           ? "REFUNDED"
//           : "PARTIALLY_REFUNDED",
//       },
//     });

//     await tx.paymentTransaction.create({
//       data: {
//         paymentId: payment.id,
//         type: isFull ? "REFUND" : "PARTIAL_REFUND",
//         status: "SUCCESS",
//         transactionId: charge.id,
//         amount: totalRefunded,
//         currency: charge.currency.toUpperCase(),
//       },
//     });

//     if (isFull) {
//       await tx.order.update({
//         where: { id: payment.orderId },
//         data: { status: "CANCELLED" },
//       });
//     }

//   });
// };

// const handleDispute = async (dispute) => {

//   const payment = await prisma.payment.findFirst({
//     where: { chargeId: dispute.charge },
//   });

//   if (!payment) return;

//   await prisma.dispute.create({
//     data: {
//       paymentId: payment.id,
//       disputeId: dispute.id,
//       amount: parseDecimal(dispute.amount / 100),
//       status: dispute.status,
//       reason: dispute.reason,
//       message: dispute.reason,
//     },
//   });
// };

// module.exports = {
//   handlePaymentSuccess,
//   handlePaymentFailed,
//   handleRefund,
//   handleDispute
// };


const handleRazorpayWebhook = async (req, res) => {
  try {
    const event = req.body.event;
    const payload = req.body.payload;

    // PAYMENT SUCCESS
    if (event === "payment.captured") {
      const payment = await prisma.payment.findFirst({
        where: {
          paymentIntentId: payload.payment.entity.order_id,
        },
        include: { order: { include: { products: true } } },
      });

      if (!payment || payment.status === "SUCCEEDED") return res.sendStatus(200);

      await prisma.$transaction(async (tx) => {
        // STOCK DEDUCTION
        for (const item of payment.order.products) {
          if (item.productId) {
            await tx.product.update({
              where: { id: item.productId },
              data: { stock: { decrement: item.quantity } },
            });
          }
        }

        await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: "SUCCEEDED",
            chargeId: payload.payment.entity.id,
            amountCaptured: parseDecimal(payload.payment.entity.amount / 100),
          },
        });

        await tx.order.update({
          where: { id: payment.orderId },
          data: {
            status: "CONFIRMED",
            isPaid: true,
          },
        });
      });

      // EMAIL
      await sendEmailInvoice(payment.order.email, payment.order);
    }

    // PAYMENT FAILED
    if (event === "payment.failed") {
      await prisma.payment.updateMany({
        where: {
          paymentIntentId: payload.payment.entity.order_id,
        },
        data: {
          status: "FAILED",
        },
      });
    }

    // REFUND
    if (event === "refund.processed") {
      const payment = await prisma.payment.findFirst({
        where: {
          chargeId: payload.refund.entity.payment_id,
        },
        include: { order: { include: { products: true } } },
      });

      if (!payment) return res.sendStatus(200);

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "REFUNDED",
        },
      });

      // RESTOCK
      for (const item of payment.order.products) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.log("Webhook error:", error.message);
    res.status(500).send("Webhook Error");
  }
};

module.exports = { handleRazorpayWebhook };