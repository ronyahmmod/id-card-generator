const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["COMPULSORY", "OPTIONAL", "FOURTH"],
    default: "OPTIONAL",
  },
  className: {
    type: String,
    required: true,
  },
  department: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
