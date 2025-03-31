import React, { useState } from "react";
import Chat from "./components/Chat";
import FileUpload from "./components/FileUpload";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-6 text-gray-200">
          Chat Bot
        </h1>

        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-2 text-lg transition-colors duration-200 ${
                activeTab === "chat"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab("chat")}
            >
              चैट
            </button>
            <button
              className={`flex-1 py-3 text-lg transition-colors duration-200 ${
                activeTab === "upload"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab("upload")}
            >
              ज्ञान आधार अपलोड
            </button>
          </div>

          <div className="h-[70vh] p-4">
            {activeTab === "chat" ? <Chat /> : <FileUpload />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
