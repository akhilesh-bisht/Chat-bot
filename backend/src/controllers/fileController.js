import fs from "fs";
import pdfParse from "pdf-parse";
import csvParser from "csv-parser";

// ✅ File Upload
export const uploadFile = (req, res) => {
  try {
    res.json({
      message: "फ़ाइल सफलतापूर्वक अपलोड हो गई",
      filename: req.file.filename,
    });
  } catch (error) {
    console.error("File Upload Error:", error);
    res.status(500).json({ error: "फ़ाइल अपलोड करने में त्रुटि हुई" });
  }
};

// ✅ Process PDF File
export const processPDF = async (req, res) => {
  try {
    const filePath = path.resolve(
      "backend",
      "test",
      "data",
      "05-versions-space.pdf"
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    res.json({ text: data.text });
  } catch (error) {
    console.error("PDF Processing Error:", error);
    res.status(500).json({ error: "PDF प्रोसेस करने में त्रुटि हुई" });
  }
};

// ✅ Process CSV File
export const processCSV = (req, res) => {
  try {
    const filePath = `uploads/${req.body.filename}`;
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => res.json({ data: results }))
      .on("error", (error) => {
        console.error("CSV Processing Error:", error);
        res.status(500).json({ error: "CSV प्रोसेस करने में त्रुटि हुई" });
      });
  } catch (error) {
    console.error("CSV Processing Error:", error);
    res.status(500).json({ error: "CSV प्रोसेस करने में त्रुटि हुई" });
  }
};

// ✅ Process Text File
export const processText = (req, res) => {
  try {
    const filePath = `uploads/${req.body.filename}`;
    const text = fs.readFileSync(filePath, "utf-8");

    res.json({ text });
  } catch (error) {
    console.error("Text Processing Error:", error);
    res.status(500).json({ error: "Text फ़ाइल प्रोसेस करने में त्रुटि हुई" });
  }
};
