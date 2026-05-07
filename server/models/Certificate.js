const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    default: "",
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);
