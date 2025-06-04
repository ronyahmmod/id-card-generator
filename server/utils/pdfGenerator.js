const puppeteer = require("puppeteer");

exports.generatePdfBuffer = async (html) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "30px", bottom: "30px", left: "20px", right: "20px" },
  });

  await browser.close();
  return pdfBuffer;
};
