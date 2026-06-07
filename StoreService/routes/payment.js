const express = require("express");
const router = express.Router();
const {
  createPaymentOrder,
  verifyRazorpayPayment,
} = require("../controllers/paymentsController");

/* =====================================================
   CREATE PAYMENT ORDER
===================================================== */
router.post("/create-order", createPaymentOrder);
router.post("/create-payment-intent", createPaymentOrder);
router.post("/verify", verifyRazorpayPayment);

module.exports = router;
