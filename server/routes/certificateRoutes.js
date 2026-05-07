const express = require("express");
const router = express.Router();

const {
  getCertificates,
  createCertificate,
  deleteCertificate
} = require("../controllers/certificateController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getCertificates);
router.post("/", protect, createCertificate);
router.delete("/:id", protect, deleteCertificate);

module.exports = router;
