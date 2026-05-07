const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tech: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "/portfolio.png"
  },
  link: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
