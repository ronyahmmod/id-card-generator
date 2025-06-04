const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
const upload = require("../middlewares/upload");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(upload.single("photoFile"), employeeController.createEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployee)
  .patch(upload.single("photoFile"), employeeController.partialUpdateEmployee)
  .delete(employeeController.deleteEmployee);

router.post("/generate-pdf", employeeController.generateEmployeeListPdf);
router.post("/generate-id-cards", employeeController.generateIdCards);
module.exports = router;
