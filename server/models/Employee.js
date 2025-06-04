const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: [true, "An employee name is required"] },
  designation: {
    type: String,
    required: [true, "Employee designation is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    default: "teacher",
  },
  department: { type: String },
  subject: { type: String },
  email: {
    type: String,
    required: [true, "Email address required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please insert a valid email",
    ],
  },
  phone: {
    type: String,
    required: [true, "Employee phone is required"],
  },
  secondaryPhone: String,
  photoUrl: {
    type: String,
    required: [true, "Photo URL is required"],
  },
  photoPublicId: {
    type: String,
    required: [true, "Photo public ID is required"],
  },
  joinDate: {
    type: Date,
    required: [true, "Joining date is required"],
  },
  mpoDate: {
    type: Date,
  },
  indexNo: {
    type: String,
  },
  retiredOn: {
    type: Date,
  },
  dob: {
    type: Date,
  },
  nid: {
    type: String,
  },
  address: {
    type: String,
  },
  education: [
    {
      examName: {
        type: String,
        required: [true, "Exam name is required (ex: SSC)"],
      },
      examYear: {
        type: String,
        required: [true, "Exam year must required (ex: 2020)"],
      },
      institutionName: {
        type: String,
      },
      authority: {
        type: String,
        required: [
          true,
          "Exam authority like board or university or any other reconigable authority name",
        ],
      },
      result: {
        type: String,
        required: [true, "Exam result is required"],
      },
      base: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
