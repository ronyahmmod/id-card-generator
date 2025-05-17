const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  deleteStudent,
  updateStudent,
  partialUpdateStudent,
  getStudent,
} = require("../controller/studentController");

router.post("/", addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);
router.patch("/:id", partialUpdateStudent);

module.exports = router;
