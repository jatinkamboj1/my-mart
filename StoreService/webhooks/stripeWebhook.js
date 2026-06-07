// const Stripe = require("stripe");
// const { handlePaymentSuccess, handlePaymentFailed, handleRefund, handleDispute } = require("../services/stripehooks");

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // const stripeWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;

// /* =====================================================
//    STRIPE WEBHOOK
// ===================================================== */
// const stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       stripeWebhookKey
//     );
//   } catch (err) {
//     console.error("❌ Signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   try {
//     switch (event.type) {

//       case "payment_intent.succeeded":
//         await handlePaymentSuccess(event.data.object);
//         break;

//       case "payment_intent.payment_failed":
//         await handlePaymentFailed(event.data.object);
//         break;

//       case "charge.refunded":
//         await handleRefund(event.data.object);
//         break;

//       case "charge.dispute.created":
//         await handleDispute(event.data.object);
//         break;

//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     res.json({ received: true });

//   } catch (error) {
//     console.error("❌ Webhook processing error:", error);
//     res.status(500).send("Webhook processing failed");
//   }
// };

// module.exports = {stripeWebhook};


const prisma = require("../prismaClient");
const crypto = require("crypto");
const { parseDecimal } = require("../utils/healper");
const { sendEmailInvoice } = require("../utils/mail/sender");

const handleRazorpayWebhook = async (req, res) => {
  try {
    const rawBody = Buffer.isBuffer(req.body)
      ? req.body.toString("utf8")
      : JSON.stringify(req.body);
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== req.headers["x-razorpay-signature"]) {
        return res.status(400).send("Invalid Razorpay webhook signature");
      }
    }

    const body = Buffer.isBuffer(req.body) ? JSON.parse(rawBody) : req.body;
    const event = body.event;
    const payload = body.payload;

    // =========================
    // ✅ PAYMENT SUCCESS
    // =========================
    if (event === "payment.captured") {
      const paymentEntity = payload.payment.entity;

      const payment = await prisma.payment.findFirst({
        where: {
          paymentIntentId: paymentEntity.order_id,
        },
        include: { order: { include: { products: true } } },
      });

      if (!payment || payment.status === "SUCCEEDED") {
        return res.sendStatus(200);
      }

      let updatedPayment;

      await prisma.$transaction(async (tx) => {
        // STOCK DEDUCTION (same logic as Stripe)
        for (const item of payment.order.products) {

          if (item.productVariantId) {
            const updated = await tx.productVariant.updateMany({
              where: {
                id: item.productVariantId,
                stock: { gte: item.quantity },
              },
              data: {
                stock: { decrement: item.quantity },
              },
            });

            if (updated.count === 0)
              throw new Error("Insufficient variant stock");
          }

          if (item.productId) {
            const updated = await tx.product.updateMany({
              where: {
                id: item.productId,
                stock: { gte: item.quantity },
              },
              data: {
                stock: { decrement: item.quantity },
              },
            });

            if (updated.count === 0)
              throw new Error("Insufficient product stock");
          }
        }

        // UPDATE PAYMENT
        updatedPayment = await tx.payment.update({
          where: { id: payment.id },
          data: {
            status: "SUCCEEDED",
            chargeId: paymentEntity.id,
            amountCaptured: parseDecimal(paymentEntity.amount / 100),
          },
          include: { order: true },
        });

        // PAYMENT TRANSACTION
        await tx.paymentTransaction.create({
          data: {
            paymentId: payment.id,
            type: "CHARGE",
            status: "SUCCESS",
            transactionId: paymentEntity.id,
            amount: parseDecimal(paymentEntity.amount / 100),
            currency: paymentEntity.currency.toUpperCase(),
          },
        });

        // ORDER UPDATE
        await tx.order.update({
          where: { id: payment.orderId },
          data: {
            status: "CONFIRMED",
            isPaid: true,
          },
        });
      });

      // EMAIL AFTER TRANSACTION
      try {
        if (updatedPayment?.order?.email) {
          await sendEmailInvoice(
            updatedPayment.order.email,
            updatedPayment.order
          );
        }
      } catch (err) {
        console.log("Email failed:", err.message);
      }
    }

    // =========================
    // ❌ PAYMENT FAILED
    // =========================
    if (event === "payment.failed") {
      const paymentEntity = payload.payment.entity;

      await prisma.payment.updateMany({
        where: {
          paymentIntentId: paymentEntity.order_id,
        },
        data: {
          status: "FAILED",
          failureReason: paymentEntity.error_description || "Payment failed",
        },
      });
    }

    // =========================
    // 🔁 REFUND
    // =========================
    if (event === "refund.processed") {
      const refundEntity = payload.refund.entity;

      const payment = await prisma.payment.findFirst({
        where: {
          chargeId: refundEntity.payment_id,
        },
        include: { order: { include: { products: true } } },
      });

      if (!payment) return res.sendStatus(200);

      const isFull = refundEntity.amount === refundEntity.amount_refunded;

      let totalRefunded = parseDecimal(refundEntity.amount / 100);

      await prisma.$transaction(async (tx) => {
        // RESTOCK ONLY FULL REFUND
        if (isFull) {
          for (const item of payment.order.products) {
            if (item.productVariantId) {
              await tx.productVariant.update({
                where: { id: item.productVariantId },
                data: { stock: { increment: item.quantity } },
              });
            }

            if (item.productId) {
              await tx.product.update({
                where: { id: item.productId },
                data: { stock: { increment: item.quantity } },
              });
            }
          }
        }

        await tx.payment.update({
          where: { id: payment.id },
          data: {
            amountRefunded: totalRefunded,
            status: isFull ? "REFUNDED" : "PARTIALLY_REFUNDED",
          },
        });

        await tx.paymentTransaction.create({
          data: {
            paymentId: payment.id,
            type: isFull ? "REFUND" : "PARTIAL_REFUND",
            status: "SUCCESS",
            transactionId: refundEntity.id,
            amount: totalRefunded,
            currency: refundEntity.currency.toUpperCase(),
          },
        });

        if (isFull) {
          await tx.order.update({
            where: { id: payment.orderId },
            data: {
              status: "CANCELLED",
            },
          });
        }
      });
    }

    // =========================
    // ⚠️ DISPUTE
    // =========================
    if (event === "payment.dispute.created") {
      const dispute = payload.dispute.entity;

      const payment = await prisma.payment.findFirst({
        where: {
          chargeId: dispute.payment_id,
        },
      });

      if (!payment) return res.sendStatus(200);

      await prisma.dispute.create({
        data: {
          paymentId: payment.id,
          disputeId: dispute.id,
          amount: parseDecimal(dispute.amount / 100),
          status: dispute.status,
          reason: dispute.reason,
          message: dispute.reason,
        },
      });
    }

    return res.json({ received: true });
  } catch (error) {
    console.log("Razorpay webhook error:", error.message);
    return res.status(500).send("Webhook Error");
  }
};

module.exports = { handleRazorpayWebhook };
