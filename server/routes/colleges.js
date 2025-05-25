const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  addCollegeInfo,
  getAllCollegeInfos,
  getLatestCollegeInfo,
  updateCollegeInfo,
  deleteCollegeInfo,
} = require("../controller/collegeInfoController");

router.post(
  "/",
  upload.fields([{ name: "logo" }, { name: "signature" }]),
  addCollegeInfo
);
router.get("/latest", getLatestCollegeInfo);
router.get("/", getAllCollegeInfos);
router.patch(
  "/:id",
  upload.fields([{ name: "logoFile" }, { name: "signFile" }]),
  updateCollegeInfo
);
router.delete("/:id", deleteCollegeInfo);

module.exports = router;
