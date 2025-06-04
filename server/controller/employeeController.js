const Employee = require("../models/Employee");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const moment = require("moment");
const QRCode = require("qrcode");
const { generatePdfBuffer } = require("../utils/pdfGenerator");

const CollegeInfo = require("../models/CollegeInfo");
const sortEmployees = require("../utils/sortEmployees");
const { cloudinary, deleteFromCloudinary } = require("../config/cloudinary");

const fieldLabels = {
  sl: "SL",
  name: "Name",
  designation: "Designation",
  subject: "Subject",
  phone: "Mobile Number",
  signature: "Signature",
};

exports.createEmployee = async (req, res) => {
  try {
    let photoData = {};
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "college-system/employees",
      });
      photoData = {
        photoUrl: result.secure_url,
        photoPublicId: result.public_id,
      };
    }
    let education = [];
    if (req.body.education) {
      try {
        education = JSON.parse(req.body.education);
      } catch (error) {
        return res.status(400).json({ message: "Invalid education format" });
      }
    }
    const employee = await Employee.create({
      ...req.body,
      education,
      ...photoData,
    });
    return res.status(201).json({ success: true, data: employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, error: error });
  } finally {
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }
    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await Employee.countDocuments(query);
    return res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: employees,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured when fetching employees", error });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employe.findByIdAndDelete(req.params.id);
    if (!this.getAllEmployees) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (employee.photoPublicId) {
      await deleteFromCloudinary(employee.photoPublicId);
    }
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occured during deleting employee", error });
  }
};

exports.partialUpdateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const updateFields = { ...req.body };
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "college-system/employees",
        });
        if (employee.photoPublicId) {
          await deleteFromCloudinary(employee.photoPublicId);
        }
        updateFields.photoUrl = result.secure_url;
        updateFields.photoPublicId = result.public_id;
      } catch (uploadError) {
        console.error(uploadError);
        return res.status(500).json({
          message: "Teachers photo upload failed. Employee data not updated",
          error: uploadError,
        });
      } finally {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }
    let education = [];
    if (req.body.education) {
      try {
        education = JSON.parse(req.body.education);
      } catch (error) {
        return res.status(400).json({ message: "Invalid education format" });
      }
    }
    updateFields.education = education;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ data: updatedEmployee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error occured during updating employee", error });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json({ data: employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error during fetching employee", error });
  }
};

exports.generateEmployeeListPdf = async (req, res) => {
  try {
    const { selectedFields, filterType, configText } = req.body;
    let query = {};
    if (filterType === "Teacher") query.role = "teacher";
    else if (filterType === "Staff") query.role = "staff";

    const employees = await Employee.find(query).lean();
    const sortedEmployees = sortEmployees(employees);

    const templatePath = path.join(
      __dirname,
      "../templates/employeeListTemplate.ejs"
    );
    const html = await ejs.renderFile(templatePath, {
      title: configText.title || "Employee List",
      subTitle: configText.subTitle || "Jibannagar Degree College",
      selectedFields,
      fieldLabels,
      employees: sortedEmployees,
    });

    const pdfBuffer = await generatePdfBuffer(html); // generate PDF from HTML

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${configText.title.replace(
        /\s+/g,
        "_"
      )}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};

exports.generateIdCards = async (req, res) => {
  try {
    const { selectedEmployees } = req.body;
    const latestCollegeInfo = await CollegeInfo.findOne().sort({
      createdAt: -1,
    });
    const employees = await Employee.find({
      _id: { $in: selectedEmployees },
    }).lean();
    for (const emp of employees) {
      emp.qrCodeDataUrl = await QRCode.toDataURL(emp._id.toString());
      emp.issueDate = moment().format("YYYY-MM-DD");
      emp.expiryDate = emp.dob
        ? moment(emp.dob).add(60, "years").format("YYYY-MM-DD")
        : "N/A";
    }

    // Rended ID cards according client selections
    const html = await ejs.renderFile(
      path.join(__dirname, "../templates/employeeIdCard.ejs"),
      { employees, college: latestCollegeInfo }
    );
    // Lunch puppetor using system chrome in mac os
    const pdfBuffer = await generatePdfBuffer(html);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=employee-id-cards.pdf",
    });
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to generate ID CARDS", data: error });
  }
};
