const express = require("express");
const router = express.Router();

const {
  getContacts,
  createContact,
  deleteContact
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getContacts);
router.post("/", createContact);
router.delete("/:id", protect, deleteContact);

module.exports = router;
