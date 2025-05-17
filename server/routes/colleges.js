const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  addCollegeInfo,
  getAllCollegeInfos,
  getLatestCollegeInfo,
} = require("../controller/collegeInfoController");

router.post(
  "/",
  upload.fields([{ name: "logo" }, { name: "signature" }]),
  addCollegeInfo
);
router.get("/latest", getLatestCollegeInfo);
router.get("/", getAllCollegeInfos);

module.exports = router;
