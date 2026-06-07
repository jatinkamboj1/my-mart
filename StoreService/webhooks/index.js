const express = require("express");
const { royalMailWebhook } = require("./royalMailWebhook");
const { handleRazorpayWebhook } = require("./stripeWebhook");

const router = express.Router();

router.post("/royal-mail", royalMailWebhook);
router.post("/razorpay", express.raw({ type: "application/json" }), handleRazorpayWebhook);
router.post("/stripe", express.raw({ type: "application/json" }), handleRazorpayWebhook);


module.exports = router;

// Razorpay webhook URL: /webhooks/razorpay
