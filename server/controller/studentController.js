const Student = require("../models/Student");

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
    photo,
    category,
    session,
  } = req.body;
  try {
    const newStudent = new Student({
      fullName,
      fatherName,
      motherName,
      studentId,
      roll,
      className,
      bloodGroup,
      dateOfBirth,
      section,
      photo,
      category,
      session,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
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
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updateStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json(updateStudent);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occured: " + error.message });
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
