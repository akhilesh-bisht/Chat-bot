# 🤖 Hindi AI Chatbot with File Upload & Knowledge Base

This project is a Hindi-language AI chatbot built using:

- **Node.js + Express**
- **Google Generative AI (Gemini 1.5)**
- **MongoDB** for storing knowledge base content
- **File upload support** for PDF, CSV, and TXT

Uploaded files are parsed, their content is saved to MongoDB, and used as reference/context for smart answers in Hindi.

---

## 🗂 Features

- 🧠 AI chatbot that responds in friendly, human-like Hindi
- 📄 Upload files (`.pdf`, `.csv`, `.txt`) to build knowledge base
- 📦 MongoDB backend to store and retrieve context
- 🛡 Error handling and file type validation
- 🧹 Auto-deletes uploaded files after processing

---

## 🚀 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/hindi-ai-chatbot.git
cd hindi-ai-chatbot
2. Install dependencies
bash
Copy
Edit
npm install
3. Create .env file
env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_generative_ai_key
4. Run the server
bash
Copy
Edit
npm start
📤 File Upload API
POST /api/upload

Field	Type	Required	Description
file	file	✅	PDF, CSV, or TXT file

Response:

json
Copy
Edit
{
  "message": "फ़ाइल सफलतापूर्वक प्रोसेस हो गई।",
  "extractedText": "Extracted content from file..."
}
💬 Chatbot API
POST /api/chat

Field	Type	Required	Description
message	string	✅	User question in any form

Response:

json
Copy
Edit
{
  "reply": "AI chatbot's answer in Hindi..."
}
📁 Folder Structure
bash
Copy
Edit
.
├── controllers/
│   ├── chatController.js
│   └── uploadController.js
├── models/
│   └── knowledgeBase.js
├── routes/
│   ├── chatRoutes.js
│   └── uploadRoutes.js
├── uploads/             # Temporary files (auto-deleted)
├── .env
├── app.js
├── package.json
└── README.md
📌 Dependencies
express

mongoose

dotenv

multer

pdf-parse

csv-parser

@google/generative-ai

🛠 Future Improvements
 Support for .docx and .xlsx

 Search/filter knowledge base

 Web frontend with chat UI

 Multi-language support

🧠 Prompt Template (Used in Gemini API)
तुम एक बुद्धिमान, मजाकिया और दोस्ताना हिंदी AI चैटबॉट हो। अगर संदर्भ जानकारी से उत्तर मिल जाए — तो उसका उपयोग करो। नहीं मिले तो सामान्य ज्ञान, समझ और रचनात्मकता से उत्तर दो। हर उत्तर हिंदी में दो।

👨‍💻 Author
Made with ❤️ using Google Gemini & Node.js
© 2025 Akhilesh bisht
