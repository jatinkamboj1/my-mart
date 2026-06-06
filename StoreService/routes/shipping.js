const express = require("express");
const { authenticateJWT, isAdmin } = require("../middleware/auth");
const {
  createDeliveryType,
  getDeliveryTypes,
  updateDeliveryType,
  deleteDeliveryType,
  createShippingFee,
  getShippingFees,
  updateShippingFee,
  deleteShippingFee,
  getDeliveryTypeById,
  getShippingFeeById,
  getApplicableShippingFee,
} = require("../controllers/shippingController");

const deliveryRouter = express.Router();

// ====== DELIVERY TYPE ROUTES ======
deliveryRouter
  .route("/")
  .get(authenticateJWT, isAdmin, getDeliveryTypes)
  .post(authenticateJWT, isAdmin, createDeliveryType);

deliveryRouter
  .route("/:id")
  .get(authenticateJWT, isAdmin, getDeliveryTypeById)
  .put(authenticateJWT, isAdmin, updateDeliveryType)
  .delete(authenticateJWT, isAdmin, deleteDeliveryType);

const shippingRouter = express.Router();
// ====== SHIPPING FEE ROUTES ======
shippingRouter.get(
  "/applicable",
  authenticateJWT, // optional if you need auth
  getApplicableShippingFee
);
shippingRouter
  .route("/")
  .get(authenticateJWT, isAdmin, getShippingFees)
  .post(authenticateJWT, isAdmin, createShippingFee);

shippingRouter
  .route("/:id")
  .get(authenticateJWT, isAdmin, getShippingFeeById)
  .put(authenticateJWT, isAdmin, updateShippingFee)
  .delete(authenticateJWT, isAdmin, deleteShippingFee);

module.exports = { deliveryRouter, shippingRouter };
