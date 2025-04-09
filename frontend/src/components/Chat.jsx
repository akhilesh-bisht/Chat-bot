import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    // Load chat history from localStorage
    const savedChats = localStorage.getItem("chatHistory");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            role: "assistant",
            content:
              "नमस्ते! मैं आपकी हिंदी में मदद करने के लिए तैयार हूँ। कृपया अपना प्रश्न पूछें।",
          },
        ];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Save messages to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to API
      const response = await axios.post(
        "https://chat-bot-pq49.onrender.com/api/chat",
        {
          message: input,
        }
      );

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "मुझे खेद है, एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages([
      {
        role: "assistant",
        content:
          "नमस्ते! मैं आपकी हिंदी में मदद करने के लिए तैयार हूँ। कृपया अपना प्रश्न पूछें।",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">📜 चैट हिस्ट्री</h2>
        <button
          onClick={clearChat}
          className="bg-red-600 px-3 py-1 rounded-lg text-white hover:bg-red-700 transition"
        >
          साफ करें
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 text-white ${
                msg.role === "user" ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-700 text-white flex items-center">
              <p className="mr-2">🔎 खोज रहा हूँ</p>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="अपना प्रश्न हिंदी में पूछें..."
            className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            dir="auto"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            भेजें
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
