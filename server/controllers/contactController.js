const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message saved"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact };