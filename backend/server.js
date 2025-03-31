import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatbotRoutes from "./src/routes/chatbotRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Use chatbot routes
app.use("/api", chatbotRoutes);
// app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
