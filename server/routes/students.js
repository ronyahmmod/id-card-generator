const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudents,
} = require("../controller/studentController");

router.post("/", addStudent);

module.exports = router;
