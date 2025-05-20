const express = require("express");
const router = express.Router();

const {
  generateIdCards,
  genIdCards,
} = require("../controller/idCardController");

router.post("/generate", generateIdCards);
router.post("/generate-id-cards", genIdCards);

module.exports = router;
