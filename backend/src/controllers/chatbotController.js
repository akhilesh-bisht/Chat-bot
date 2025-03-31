import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import KnowledgeBase from "../models/knowledgeBase.js";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("User Message:", message);

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 📌 **Fetch stored text from MongoDB**
    const knowledgeData = await KnowledgeBase.find();

    if (!knowledgeData.length) {
      return res.status(404).json({ error: "कोई जानकारी उपलब्ध नहीं है।" });
    }

    // **Extract only the text content**
    const contextText = knowledgeData.map((doc) => doc.content).join("\n");
    console.log("Extracted Content:", contextText.substring(0, 500));

    // 🧠 **Initialize Gemini AI Model**
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 📌 **Better Prompt with Context**
    const prompt = `
      **तुम एक हिंदी चैटबॉट हो।**
      नीचे दी गई जानकारी को संदर्भ के रूप में उपयोग करो और सिर्फ़ उसी के आधार पर उत्तर दो।

      ***संदर्भ:***
      ${contextText}

      ***उपयोगकर्ता का प्रश्न:***
      ${message}

      ***उत्तर केवल हिंदी में दो।***
    `;

    console.log("Prompt Sent to Gemini:", prompt.substring(0, 500));

    // ✨ **Generate AI Response**
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    console.log("Gemini API Response:", JSON.stringify(result, null, 2));

    // 📌 **Extract Response Correctly**
    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "मुझे कोई उत्तर नहीं मिला।";

    res.json({ reply });
  } catch (error) {
    console.error(
      "Chatbot Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "कुछ समस्या हो गई है। बाद में पुनः प्रयास करें।" });
  }
};
