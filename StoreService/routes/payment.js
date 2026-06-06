const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentsController");

/* =====================================================
   CREATE PAYMENT INTENT
===================================================== */
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;
