const Student = require("../models/Student");
const { cloudinary, deleteFromCloudinary } = require("../config/cloudinary");
const fs = require("fs");

const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const query = {};

    // optional filtering by category
    if (category) {
      query.category = category;
    }

    // Optional text search (on name or studentId)
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ];
    }
    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Student.countDocuments(query);
    return res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: students,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  try {
    const {
      fullName,
      fatherName,
      motherName,
      studentId,
      roll,
      className,
      bloodGroup,
      dateOfBirth,
      section,
      category,
      session,
      group,
    } = req.body;
    let photoUrl = null;
    let photoPublicId = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "college-system/students",
      });
      photoUrl = result.secure_url;
      photoPublicId = result.public_id;
      fs.unlinkSync(req.file.path); // Delete file from the local
    }
    const newStudent = new Student({
      fullName,
      fatherName,
      motherName,
      studentId,
      roll,
      className,
      bloodGroup,
      dateOfBirth,
      group,
      section,
      photo: photoUrl,
      photoPublicId: photoPublicId,
      category,
      session,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "An error occured: " + error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (student.photoPublicId) {
      // Delete photo from the cloudinary
      await deleteFromCloudinary(student.photoPublicId);
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured: " + error.message });
  }
};

// Full update student
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json(updateStudent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured: " + error.message });
  }
};

// Partial update (only selected fields)

const partialUpdateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const updateFields = { ...req.body };

    // If new photo file uploaded
    if (req.file) {
      // console.log(req.file);
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "college-system/students",
        });

        // Delete previous photo from Cloudinary after successful upload
        if (student.photoPublicId) {
          await deleteFromCloudinary(student.photoPublicId);
        }

        // Update fields
        updateFields.photo = result.secure_url;
        updateFields.photoPublicId = result.public_id;
      } catch (uploadErr) {
        console.error(uploadErr);
        return res.status(500).json({
          message: "Photo upload failed. Student data not updated.",
          error: uploadErr.message,
        });
      } finally {
        // Always remove the temp file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }

    // Perform the partial update
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred: " + error.message });
  }
};

// Get a student by id
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json("Student not found");
    }
    return res.status(200).json(student);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured: " + error.message });
  }
};
module.exports = {
  addStudent,
  getAllStudents,
  deleteStudent,
  partialUpdateStudent,
  updateStudent,
  getStudent,
};
