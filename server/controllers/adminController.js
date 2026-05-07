const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Current and new password are required" });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: "New password must be at least 6 characters" });
  }

  const admin = await Admin.findById(req.adminId);

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Current password is wrong" });
  }

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  res.json({ success: true, message: "Password changed successfully" });
};

module.exports = { loginAdmin, changePassword };
