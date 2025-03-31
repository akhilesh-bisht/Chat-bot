import express from "express";
import { getChatResponse } from "../controllers/chatbotController.js";

const router = express.Router();

// Chatbot Route (POST request)
router.post("/chat", getChatResponse);

export default router;
