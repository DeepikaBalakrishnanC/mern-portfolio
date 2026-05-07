const express = require("express");
const router = express.Router();

const {
  getSkills,
  createSkill,
  deleteSkill
} = require("../controllers/skillController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getSkills);
router.post("/", protect, createSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
