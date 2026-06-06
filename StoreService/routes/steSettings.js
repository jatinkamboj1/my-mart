// src/routes/settings.routes.js
const express = require("express");
const router = express.Router();

const controller = require("../controllers/siteSettingController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

// CRUD
router.post("/", authenticateJWT, isAdmin, controller.createSetting);
router.put("/", authenticateJWT, isAdmin, controller.updateSetting);
router.get("/", controller.getAllSettings);
router.get("/:key", controller.getSettingByKey);


module.exports = router;