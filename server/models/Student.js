const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Student fullname is required"],
      trim: true,
    },
    fatherName: {
      type: String,
      required: [true, "Student father name is required"],
      trim: true,
    },
    motherName: {
      type: String,
      required: [true, "Student mother name is required"],
      trim: true,
    },
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      default: () => nanoid(10),
    },
    className: {
      type: String,
      required: [true, "Class is required"],
    },
    session: {
      type: String,
      required: [true, "Session is required"],
      trim: true,
    },
    group: {
      type: String,
      required: [true, "Group is required"],
      trim: true,
    },
    section: {
      type: String,
    },
    roll: {
      type: String,
      required: [true, "Class roll is required"],
      trim: true,
    },
    bloodGroup: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    photo: {
      type: String,
      required: [true, "Student must have a photo"],
    },
    photoPublicId: {
      type: String,
      required: [true, "Photo public id is required"],
    },
    category: {
      type: String,
      enum: ["HSC", "DEGREE", "HONORS"],
      required: [true, "Category is required"],
    },
    additionalInfo: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
