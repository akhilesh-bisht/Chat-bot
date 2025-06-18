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
