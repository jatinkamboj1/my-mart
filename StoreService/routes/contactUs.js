const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  getContactById,
  markContactAsRead,
} = require("../controllers/countactUs");

router.post("/", createContact);

router.get("/", getContacts);

router.get("/:id", getContactById);

router.patch("/:id/read", markContactAsRead);

module.exports = router;