import express from "express";
import {
  uploadFile,
  processPDF,
  processCSV,
  processText,
} from "../controllers/fileController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFile);
router.post("/process-pdf", processPDF);
router.post("/process-csv", processCSV);
router.post("/process-text", processText);

export default router;
