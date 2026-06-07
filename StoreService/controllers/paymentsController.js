const Razorpay = require("razorpay");
const crypto = require("crypto");
const prisma = require("../prismaClient");
const { parseDecimal } = require("../utils/healper");
const { sendEmailInvoice } = require("../utils/mail/sender");

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.TEST_KEY_ID;
const razorpayKeySecret =
  process.env.RAZORPAY_KEY_SECRET || process.env.TEST_KEY_SECRET;
const razorpayCurrency = process.env.RAZORPAY_CURRENCY || "INR";

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

const createPaymentOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(order.actualAmount) * 100),
      currency: razorpayCurrency,
      receipt: String(order.orderNumber),
    });

    await prisma.payment.create({
      data: {
        orderId: order.id,
        paymentIntentId: razorpayOrder.id,
        amount: order.actualAmount,
        currency: razorpayOrder.currency,
        status: "CREATED",
        metadata: razorpayOrder,
      },
    });

    return res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: razorpayKeyId,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const markPaymentSucceeded = async (
  razorpayOrderId,
  razorpayPaymentId,
  paymentDetails
) => {
  const payment = await prisma.payment.findFirst({
    where: { paymentIntentId: razorpayOrderId },
    include: { order: { include: { products: true } } },
  });

  if (!payment) {
    throw new Error("Payment record not found");
  }

  if (payment.status === "SUCCEEDED") {
    return payment;
  }

  const capturedAmount = parseDecimal(
    Number(paymentDetails?.amount || Number(payment.amount) * 100) / 100
  );

  let updatedPayment;

  await prisma.$transaction(async (tx) => {
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

        if (updated.count === 0) {
          throw new Error("Insufficient variant stock");
        }
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

        if (updated.count === 0) {
          throw new Error("Insufficient product stock");
        }
      }
    }

    updatedPayment = await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "SUCCEEDED",
        chargeId: razorpayPaymentId,
        amountCaptured: capturedAmount,
        metadata: paymentDetails || payment.metadata,
      },
      include: { order: true },
    });

    const existingTransaction = await tx.paymentTransaction.findFirst({
      where: {
        transactionId: razorpayPaymentId,
        type: "CHARGE",
      },
    });

    if (!existingTransaction) {
      await tx.paymentTransaction.create({
        data: {
          paymentId: payment.id,
          type: "CHARGE",
          status: "SUCCESS",
          transactionId: razorpayPaymentId,
          amount: capturedAmount,
          currency: (paymentDetails?.currency || payment.currency).toUpperCase(),
          rawResponse: paymentDetails,
        },
      });
    }

    await tx.order.update({
      where: { id: payment.orderId },
      data: {
        status: "CONFIRMED",
        isPaid: true,
      },
    });
  });

  try {
    if (updatedPayment?.order?.email) {
      await sendEmailInvoice(updatedPayment.order.email, updatedPayment.order);
    }
  } catch (error) {
    console.log("Email failed:", error.message);
  }

  return updatedPayment;
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing Razorpay payment details" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid Razorpay signature" });
    }

    let paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

    if (paymentDetails.order_id !== razorpay_order_id) {
      return res.status(400).json({ error: "Payment order mismatch" });
    }

    if (paymentDetails.status === "authorized") {
      paymentDetails = await razorpay.payments.capture(
        razorpay_payment_id,
        paymentDetails.amount,
        paymentDetails.currency
      );
    }

    if (paymentDetails.status !== "captured") {
      return res.status(400).json({ error: "Payment is not successful" });
    }

    const payment = await markPaymentSucceeded(
      razorpay_order_id,
      razorpay_payment_id,
      paymentDetails
    );

    return res.json({
      success: true,
      paymentId: payment.id,
      orderId: payment.orderId,
    });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentOrder, verifyRazorpayPayment };
