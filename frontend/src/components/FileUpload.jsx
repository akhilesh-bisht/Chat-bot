import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("कृपया पहले एक फ़ाइल चुनें।");
      return;
    }

    setUploading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("फ़ाइल सफलतापूर्वक अपलोड की गई!");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("फ़ाइल अपलोड करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-4">ज्ञान आधार अपलोड</h2>
      <p className="text-sm text-gray-400 mb-4">
        अपने ज्ञान आधार में हिंदी सामग्री जोड़ने के लिए PDF, TXT, या CSV फ़ाइल
        अपलोड करें।
      </p>

      <div className="border-2 border-dashed border-gray-600 p-6 rounded-lg mb-4 bg-gray-800">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
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
        className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {uploading ? "अपलोड हो रहा है..." : "फ़ाइल अपलोड करें"}
      </button>

      {message && (
        <div className="mt-4 p-2 bg-green-700 text-white rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-700 text-white rounded-lg">{error}</div>
      )}
    </div>
  );
};

export default FileUpload;
