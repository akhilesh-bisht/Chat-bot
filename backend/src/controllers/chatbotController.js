import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const getChatResponse = async (req, res) => {
  // try {
  //   const { message } = req.body;
  //   console.log(message);
  //   if (!message) {
  //     return res.status(400).json({ error: "Message is required" });
  //   }
  //   // Initialize Gemini AI Model
  //   const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
  //   // Modify the prompt to ensure Hindi response
  //   const prompt = `आप एक हिंदी चैटबॉट हैं। कृपया केवल हिंदी में उत्तर दें।
  //   उपयोगकर्ता का प्रश्न: "${message}"`;
  //   // Generate AI Response
  //   const result = await model.generateContent({
  //     contents: [{ role: "user", parts: [{ text: prompt }] }],
  //   });
  //   // Extract Response Correctly
  //   const reply =
  //     result.response.candidates[0].content.parts[0].text ||
  //     "मुझे कोई उत्तर नहीं मिला।";
  //   res.json({ reply });
  // } catch (error) {
  //   console.error("Chatbot Error:", error);
  //   res.status(500).json({ error: "Something went wrong" });
  // }
};
