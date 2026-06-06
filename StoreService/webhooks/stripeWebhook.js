const Stripe = require("stripe");
const { handlePaymentSuccess, handlePaymentFailed, handleRefund, handleDispute } = require("../services/stripehooks");

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripeWebhookKey = process.env.STRIPE_WEBHOOK_SECRET;

/* =====================================================
   STRIPE WEBHOOK
===================================================== */
const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookKey
    );
  } catch (err) {
    console.error("❌ Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {

      case "payment_intent.succeeded":
        await handlePaymentSuccess(event.data.object);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object);
        break;

      case "charge.refunded":
        await handleRefund(event.data.object);
        break;

      case "charge.dispute.created":
        await handleDispute(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.status(500).send("Webhook processing failed");
  }
};

module.exports = {stripeWebhook};
