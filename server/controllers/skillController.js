const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
};

const createSkill = async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.status(201).json(skill);
};

const deleteSkill = async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  res.json({ success: true });
};

module.exports = { getSkills, createSkill, deleteSkill };
