import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/fileController.js";

const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Route to upload a file
router.post("/upload", upload.single("file"), uploadFile);

export default router;
