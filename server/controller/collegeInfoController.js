const CollegeInfo = require("../models/CollegeInfo");
const { cloudinary, deleteFromCloudinary } = require("../config/cloudinary");
const fs = require("fs");

// Add new version
exports.addCollegeInfo = async (req, res) => {
  try {
    const { name, address, principalName } = req.body;
    let logoUrl = null;
    let principalSignatureUrl = null;
    let logoPublicId = null;
    let signPublicId = null;

    if (req.files["logoFile"]) {
      const result = await cloudinary.uploader.upload(
        req.files["logoFile"][0].path,
        {
          folder: "college-system/logo",
        }
      );
      logoUrl = result.secure_url;
      logoPublicId = result.public_id;
      fs.unlinkSync(req.files["logoFile"][0].path);
    }
    if (req.files["signFile"]) {
      const result = await cloudinary.uploader.upload(
        req.files["signFile"][0].path,
        {
          folder: "college-system/signature",
        }
      );
      principalSignatureUrl = result.secure_url;
      signPublicId = result.public_id;
      fs.unlinkSync(req.files["signFile"][0].path); // Remove temp file
    }

    const newInfo = new CollegeInfo({
      name,
      address,
      logoUrl,
      principalName,
      principalSignatureUrl,
      logoPublicId,
      signPublicId,
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

    const colleges = await CollegeInfo.find(query)
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
    console.error(error.message);
    return res.status(500).json({ message: "Error occured " + error.message });
  }
};

exports.updateCollegeInfo = async (req, res) => {
  try {
    const college = await CollegeInfo.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const updateFields = { ...req.body };
    if (req.files["logoFile"]) {
      try {
        const result = await cloudinary.uploader.upload(
          req.files["logoFile"][0].path,
          {
            folder: "college-system/logo",
          }
        );

        if (college.logoPublicId) {
          await deleteFromCloudinary(college.logoPublicId);
        }
        updateFields.logoUrl = result.secure_url;
        updateFields.logoPublicId = result.public_id;
      } catch (uploadErr) {
        return res.status(500).json({
          message: "Photo upload failed. Student data not updated.",
          error: uploadErr.message,
        });
      } finally {
        if (fs.existsSync(req.files["logoFile"][0].path)) {
          fs.unlinkSync(req.files["logoFile"][0].path);
        }
      }
    }

    if (req.files["signFile"]) {
      try {
        const result = await cloudinary.uploader.upload(
          req.files["signFile"][0].path,
          {
            folder: "college-system/signature",
          }
        );

        if (college.signPublicId) {
          await deleteFromCloudinary(college.signPublicId);
        }
        updateFields.principalSignatureUrl = result.secure_url;
        updateFields.signPublicId = result.public_id;
      } catch (uploadErr) {
        return res.status(500).json({
          message: "Photo upload failed. Student data not updated.",
          error: uploadErr.message,
        });
      } finally {
        if (fs.existsSync(req.files["signFile"][0].path)) {
          fs.unlinkSync(req.files["signFile"][0].path);
        }
      }
    }

    // Perform the pertial updates
    const updatedCollege = await CollegeInfo.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(updatedCollege);
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({ message: "An error occured: " + error.message });
  }
};

exports.deleteCollegeInfo = async (req, res) => {
  try {
    const college = await CollegeInfo.findByIdAndDelete(req.params.id);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }
    if (college.logoPublicId) {
      await deleteFromCloudinary(college.logoPublicId);
    }
    if (college.signPublicId) {
      await deleteFromCloudinary(college.signPublicId);
    }
    return res.status(200).json({ message: "College delete successfully" });
  } catch (error) {
    console.error("Error occured ", error);
    return res.status(500).json(error);
  }
};
