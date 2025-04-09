import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import KnowledgeBase from "../models/knowledgeBase.js";
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const getChatResponse = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 🔍 1. Fetch knowledge base from MongoDB
    const knowledgeData = await KnowledgeBase.find();

    const contextText = knowledgeData.map((doc) => doc.content).join("\n");

    // 🧠 2. Setup Gemini AI model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 📌 3. Try using knowledge base
    const prompt = `
      **तुम एक हिंदी चैटबॉट हो।**
      नीचे दी गई जानकारी को संदर्भ के रूप में उपयोग करो और सिर्फ़ उसी के आधार पर उत्तर दो।

      ***संदर्भ:***  
      ${contextText}

      ***प्रश्न:***  
      ${message}

      ***उत्तर हमेशा हिंदी में दो, चाहे प्रश्न किसी भी भाषा में हो।***
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "";

    // ⚠️ 4. Fallback to normal AI answer (if reply is not from knowledge base)
    const notHelpfulReplies = [
      "मुझे इस संदर्भ में कोई उत्तर नहीं मिला।",
      "माफ़ कीजिए, मैं उत्तर नहीं दे सकता।",
      "उत्तर उपलब्ध नहीं है।",
    ];

    const isFallbackNeeded =
      !reply || notHelpfulReplies.some((r) => reply.includes(r));

    if (isFallbackNeeded) {
      const fallbackPrompt = `
        ***प्रश्न:***  
        ${message}

        ***उत्तर हमेशा हिंदी में दो, चाहे प्रश्न किसी भी भाषा में हो।***
      `;

      const fallbackResult = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: fallbackPrompt }] }],
      });

      reply =
        fallbackResult?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "मुझे कोई उत्तर नहीं मिला।";
    }

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
