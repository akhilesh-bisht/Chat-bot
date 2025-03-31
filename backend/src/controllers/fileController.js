import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import csvParser from "csv-parser";
import KnowledgeBase from "../models/knowledgeBase.js";
// Upload and Process File
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
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
      return res.status(400).json({ error: "Unsupported file type" });
    }
    // Save extracted text to MongoDB
    const savedData = await KnowledgeBase.create({
      fileName: req.file.originalname,
      fileType: fileExt,
      content: extractedText,
    });

    console.log("Saved in MongoDB:", savedData);

    console.log("Extracted Text:", extractedText);

    res.json({ message: "File processed successfully", extractedText });

    // Cleanup: Remove the uploaded file after processing
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("File Processing Error:", error);
    res.status(500).json({ error: "Error processing file" });
  }
};

// Helper function to process CSV
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
