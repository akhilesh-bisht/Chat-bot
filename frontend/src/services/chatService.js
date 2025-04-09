import axios from "axios";

// API endpoints
const API_ENDPOINTS = {
  CHAT: "/api/chat",
  HISTORY: "/api/chat-history",
  CLEAR: "/api/clear-chat",
};

export const fetchChatHistory = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.HISTORY);
    return response.data.messages;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};

export const sendMessage = async (message, file) => {
  try {
    const formData = new FormData();
    formData.append("message", message);

    if (file) {
      formData.append("file", file);
    }

    const response = await axios.post(API_ENDPOINTS.CHAT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const clearChatHistory = async () => {
  try {
    const response = await axios.post(API_ENDPOINTS.CLEAR);
    return response.data;
  } catch (error) {
    console.error("Error clearing chat history:", error);
    throw error;
  }
};
