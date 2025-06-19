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
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    guardianMobile: {
      type: String,
      required: true,
    },
    previousEducation: [
      {
        examName: String,
        examYear: String,
        result: String,
        institutionName: String,
        authority: String,
        resultBase: String,
      },
    ],
    quota: [{ name: String, description: String }],
    skills: [{ name: String, description: String }],
    awards: [
      {
        name: String,
        description: String,
        year: String,
        institutionName: String,
      },
    ],
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      default: () => nanoid(10),
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected", "edit-returned"],
      default: "draft",
    },
    editableByStudent: {
      type: Boolean,
      default: true,
    },
    submittedAt: Date,
    approvedAt: Date,
    rejectedReason: String,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    trade: {
      type: String,
      trim: true,
    },
    section: {
      type: String,
    },
    roll: {
      type: String,
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
    documents: [
      {
        url: String,
        publicId: String,
        name: String,
        fileType: String,
      },
    ],
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
