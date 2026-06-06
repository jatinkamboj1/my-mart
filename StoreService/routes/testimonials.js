const express = require("express");

const { isAdmin, authenticateJWT } = require("../middleware/auth");
const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");
const router = express();

router
  .route("/")
  .get(getAllTestimonials)
  .post(authenticateJWT, isAdmin, createTestimonial);

router
  .route("/:id")
  .put(authenticateJWT, isAdmin, updateTestimonial)
  .delete(authenticateJWT, isAdmin, deleteTestimonial);

module.exports = router;
