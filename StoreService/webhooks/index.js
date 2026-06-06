const express = require("express");
const { royalMailWebhook } = require("./royalMailWebhook");
const { stripeWebhook } = require("./stripeWebhook");

const router = express.Router();

router.post("/royal-mail", royalMailWebhook);
router.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);


module.exports = router;

// stripe listen --forward-to localhost:8080/webhooks/stripe
