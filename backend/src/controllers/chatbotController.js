import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import KnowledgeBase from "../models/knowledgeBase.js";

dotenv.config();

export const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "संदेश खाली नहीं हो सकता।" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Google API key उपलब्ध नहीं है।" });
    }

    const ai = new GoogleGenerativeAI(apiKey);

    //  Retrieve the latest 20 knowledge base entries
    const knowledgeData = await KnowledgeBase.find()
      .sort({ _id: -1 })
      .limit(20);
    const contextText = knowledgeData.map((doc) => doc.content).join("\n");

    //  Initialize the Gemini model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    //  Create the prompt in Hindi
    const prompt = `You are a helpful Hindi language assistant. 
    You MUST respond in Hindi language only.
    Use the knowledge base to answer questions when possible.
    If the knowledge base doesn't have relevant information, respond based on your general knowledge, but still in Hindi.
    If you don't know the answer, say "मुझे खेद है, मुझे इस प्रश्न का उत्तर नहीं पता।"`

    //  Generate the AI response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "माफ़ करना, मैं इसका उत्तर नहीं दे सका।";

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", {
      error,
      incomingMessage: req.body?.message,
    });

    res.status(500).json({
      error: "कुछ समस्या हो गई है। बाद में पुनः प्रयास करें।",
    });
  }
};
