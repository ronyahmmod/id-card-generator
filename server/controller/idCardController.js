const CollegeInfo = require("../models/CollegeInfo");
const Student = require("../models/Student");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const path = require("path");

exports.generateIdCards = async (req, res) => {
  try {
    const { studentIds, category, session } = req.boy;
    let query = {};
    if (studentIds?.length) query._id = { $in: studentIds };
    if (category) query.category = category;
    if (session) query.session = session;

    const students = await Student.find(query);
    return res.status(200).json({ message: "ok", data: students });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured" + error.message,
    });
  }
};

exports.genIdCards = async (req, res) => {
  try {
    const { selectedStudents } = req.body;
    const students = await Student.find({ _id: { $in: selectedStudents } });
    const college = await CollegeInfo.findOne().sort({ createdAt: -1 });

    // Render EJS template
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/generateIdCard.ejs"),
      { students, college }
    );

    // Launch Puppeteer using system Chrome on macOS
    const browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: "new", // use `true` if issues
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Send PDF as response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=student-id-cards.pdf",
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
