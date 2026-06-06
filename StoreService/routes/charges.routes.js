const express = require("express");
const router = express.Router();

const { isAdmin, authenticateJWT } = require("../middleware/auth");
const chargesController = require("../controllers/chargesController");

// ADMIN-ONLY (protect with middleware if needed)
router.get("/apply", authenticateJWT, chargesController.applyCharges);
router.post("/", authenticateJWT, isAdmin, chargesController.createCharge);
router.get("/", authenticateJWT, isAdmin, chargesController.getCharges);
router.get("/:id", authenticateJWT, isAdmin, chargesController.getChargeById);
router.put("/:id", authenticateJWT, isAdmin, chargesController.updateCharge);
router.delete("/:id", authenticateJWT, isAdmin, chargesController.deleteCharge);

module.exports = router;
