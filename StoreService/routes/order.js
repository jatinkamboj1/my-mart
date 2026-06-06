const express = require("express");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Controllers
const {
  getOrders,
  getOrderById,
  createOrder,
  getUserOrdersById,
  updateOrder,
  getUserOrdersByToken,
  getOrderHistoryById,
} = require("../controllers/orderController");

// Routes
router.get("/", authenticateJWT, isAdmin, getOrders); // Get all orders
router.get("/userOrder", authenticateJWT, isAdmin, getUserOrdersByToken); // Get  orders by token user

router.get("/history/:id", authenticateJWT, getOrderHistoryById);

router
  .route("/:id")
  .get(authenticateJWT, isAdmin, getOrderById)
  .put(authenticateJWT, isAdmin, updateOrder); // Get order by ID
router.get("/user/:id", authenticateJWT, getUserOrdersById); // Get order by ID
router.post("/", authenticateJWT, createOrder); // Create a new order

module.exports = router;
