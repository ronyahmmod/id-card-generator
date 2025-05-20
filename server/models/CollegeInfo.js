const mongoose = require("mongoose");

const collegeInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "College name must be required"],
  },
  address: {
    type: String,
    required: [true, "College address is required"],
  },
  logoUrl: {
    type: String,
    required: [true, "College logo URL is required"],
  },
  principalName: {
    type: String,
    required: [true, "Principal name is required"],
  },
  principalSignatureUrl: {
    type: String,
    required: [true, "Principal signature URL is required"],
  },
  email: {
    type: String,
    required: [true, "College email must be required"],
  },
  phone: {
    type: String,
    required: [true, "College phone number is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CollegeInfo", collegeInfoSchema);
