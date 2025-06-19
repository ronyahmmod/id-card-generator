const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  part: {
    type: Number, // e.g., 1st Year = 1, 2nd Year = 2
    required: true,
  },
});

module.exports = mongoose.model("Paper", paperSchema);
