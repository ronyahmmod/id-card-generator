const CollegeInfo = require("../models/CollegeInfo");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Add new version
exports.addCollegeInfo = async (req, res) => {
  try {
    const { name, address, principalName } = req.body;
    let logoUrl = null;
    let principalSignatureUrl = null;

    if (req.files["logo"]) {
      const result = await cloudinary.uploader.upload(
        req.files["logo"][0].path,
        {
          folder: "college-system/logo",
        }
      );
      logoUrl = result.secure_url;
      fs.unlinkSync(req.files["logo"][0].path);
    }
    if (req.files["signature"]) {
      const result = await cloudinary.uploader.upload(
        req.files["signature"][0].path,
        {
          folder: "college-system/signature",
        }
      );
      principalSignatureUrl = result.secure_url;
      fs.unlinkSync(req.files["signature"][0].path); // Remove temp file
    }

    const newInfo = new CollegeInfo({
      name,
      address,
      logoUrl,
      principalName,
      principalSignatureUrl,
    });
    await newInfo.save();
    return res.status(201).json(newInfo);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error occured: " + error.message });
  }
};

// Get latest version
exports.getLatestCollegeInfo = async (req, res) => {
  try {
    const latest = await CollegeInfo.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: "College not found" });
    }
    return res.status(200).json({ data: latest });
  } catch (error) {
    return res.status(500).json({ message: "Error occured: " + error.message });
  }
};

// Get all college versions
exports.getAllCollegeInfos = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};

    // optional search for college and principal name
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { principalName: { $regex: search, $options: "i" } },
      ];
    }

    const colleges = CollegeInfo.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await CollegeInfo.countDocuments(query);
    return res.status(200).json({
      total: total,
      page: parseInt(page),
      data: colleges,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error occured " + error.message });
  }
};
