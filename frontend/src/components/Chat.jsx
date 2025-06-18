import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved
      ? JSON.parse(saved)
      : [
          {
            role: "assistant",
            content: "नमस्ते! मैं आपकी हिंदी में मदद के लिए तैयार हूँ। कृपया अपना प्रश्न पूछें।",
          },
        ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://chat-bot-pq49.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "माफ़ कीजिए, कोई त्रुटि हुई। कृपया फिर से प्रयास करें।" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages([
      {
        role: "assistant",
        content: "नमस्ते! मैं आपकी हिंदी में मदद के लिए तैयार हूँ। कृपया अपना प्रश्न पूछें।",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <FaArrowLeft onClick={()=> navigate('/')}  className="cursor-pointer"/>
        <h1 className="text-lg font-semibold">हिंदी चैटबॉट</h1>
        <button
          onClick={clearChat}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          साफ करें
        </button>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600 animate-pulse">
              उत्तर तैयार कर रहा हूँ...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-t p-4 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="अपना प्रश्न हिंदी में पूछें..."
          className="flex-1 p-2 border rounded focus:outline-none"
          dir="auto"
        />
        {/* Upload button  */}
        <button
          type="button"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          title="अपलोड करें"
          onClick={() =>navigate('/upload')}
        >
          अपलोड करें
        </button>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          भेजें
        </button>
      </form>
    </div>
  );
};

export default Chat;
