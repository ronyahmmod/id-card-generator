const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  addStudent,
  getAllStudents,
  deleteStudent,
  updateStudent,
  partialUpdateStudent,
  getStudent,
} = require("../controller/studentController");

router.post("/", upload.single("photoFile"), addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);
router.patch("/:id", upload.single("photoFile"), partialUpdateStudent);

module.exports = router;
