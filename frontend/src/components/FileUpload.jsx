"use client";
import { FaArrowLeft } from "react-icons/fa";
import React, { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const showToast = (title, description, variant = "success") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpload = async () => {
    if (!file) {
      showToast(
        "कोई फ़ाइल नहीं चुनी गई",
        "कृपया पहले एक फ़ाइल चुनें।",
        "destructive"
      );
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://chat-bot-pq49.onrender.com/api/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      showToast("सफलता!", "फ़ाइल सफलतापूर्वक अपलोड की गई।");
      setFile(null);
    } catch (error) {
      console.error("Upload Error:", error);
      showToast(
        "अपलोड विफल",
        "फ़ाइल अपलोड करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
        "destructive"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-900 text-white rounded-xl border border-gray-700">
      <FaArrowLeft onClick={()=> navigate('/chat')}  className="cursor-pointer"/>
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-sm ${
            toast.variant === "destructive"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          <strong>{toast.title}</strong>
          <div>{toast.description}</div>
        </div>
      )}
      <h2 className="text-xl font-bold">ज्ञान आधार अपलोड</h2>
      <p className="text-sm text-gray-400">
        अपने ज्ञान आधार में हिंदी सामग्री जोड़ने के लिए PDF, TXT, या CSV फ़ाइल अपलोड करें।
      </p>

      <div className="border-dashed border-2 border-gray-600 p-6 flex flex-col items-center justify-center bg-gray-800 rounded-lg">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.txt,.csv"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-400 text-center">
            फ़ाइल चुनने के लिए क्लिक करें या यहां खींचें
          </p>
          {file && (
            <p className="mt-2 text-sm font-medium text-white">{file.name}</p>
          )}
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${
          (!file || uploading) && "opacity-50 cursor-not-allowed"
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            अपलोड हो रहा है...
          </>
        ) : (
          "फ़ाइल अपलोड करें"
        )}
      </button>
    </div>
  );
};

export default FileUpload;