const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ message: error.message });
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
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occured: " + error.message });
  }
};

module.exports = { addStudent, getAllStudents };
