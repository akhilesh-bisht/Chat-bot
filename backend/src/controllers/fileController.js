import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import csvParser from "csv-parser";
import KnowledgeBase from "../models/knowledgeBase.js";

// Helper: Read and parse CSV file
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(JSON.stringify(results, null, 2)))
      .on("error", (err) => reject(err));
  });
};

// Upload and Process File
export const uploadFile = async (req, res) => {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "कोई फ़ाइल अपलोड नहीं की गई।" });
    }

    const fileExt = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    if (fileExt === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    } else if (fileExt === ".csv") {
      extractedText = await processCSV(filePath);
    } else if (fileExt === ".txt") {
      extractedText = fs.readFileSync(filePath, "utf-8");
    } else {
      return res.status(400).json({ error: "असमर्थित फ़ाइल प्रकार। कृपया PDF, CSV, या TXT अपलोड करें।" });
    }

    // Save to MongoDB
    const savedData = await KnowledgeBase.create({
      fileName: req.file.originalname,
      fileType: fileExt,
      content: extractedText,
    });

    console.log(" Saved in MongoDB:", savedData);

    res.json({
      message: "फ़ाइल सफलतापूर्वक प्रोसेस हो गई।",
      extractedText,
    });

  } catch (error) {
    console.error("File Processing Error:", error);
    res.status(500).json({ error: "फ़ाइल प्रोसेस करते समय त्रुटि हुई।" });
  } finally {
    // Clean up the uploaded file regardless of success or failure
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
