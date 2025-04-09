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

    // 🧠 Fetch context from MongoDB
    const knowledgeData = await KnowledgeBase.find();
    const contextText = knowledgeData.map((doc) => doc.content).join("\n");

    // 🎯 Initialize Gemini Model
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 📝 Smart prompt with fallback
    const prompt = `
तुम एक बुद्धिमान, मजाकिया और दोस्ताना हिंदी AI चैटबॉट हो।

• तुम्हें एक उपयोगकर्ता का सवाल मिलेगा।
• अगर संदर्भ जानकारी से उत्तर मिल जाए — तो उसका उपयोग करो।
• लेकिन अगर संदर्भ में उत्तर न हो, तब भी हर सवाल का उत्तर ज़रूर दो।
• तुम्हें हर सवाल का उत्तर सामान्य ज्ञान, समझ और रचनात्मकता से देना है।
• उत्तर हमेशा **हिंदी** में दो और ऐसा जवाब दो जिससे उपयोगकर्ता को लगे कि इंसान से बात हो रही है।

👇संदर्भ जानकारी (अगर कोई हो तो):
${contextText || "कोई संदर्भ जानकारी उपलब्ध नहीं है।"}

👇उपयोगकर्ता का प्रश्न:
${message}
    `;

    // 🔮 Generate AI Response
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "माफ़ करना, मैं इसका उत्तर नहीं दे सका।";

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res
      .status(500)
      .json({ error: "कुछ समस्या हो गई है। बाद में पुनः प्रयास करें।" });
  }
};
