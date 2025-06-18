import React from "react";
import { FaComments, FaFileAlt, FaLightbulb, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom"; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">हिंदी चैटबॉट</h1>
          <div className="space-x-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-100 transition">
              लॉगिन
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition">
              रजिस्टर
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              अपने सवालों के जवाब <span className="text-purple-600">हिंदी</span> में पाएं
            </h2>
            <p className="text-xl text-gray-600">
              हमारा हिंदी चैटबॉट आपके सभी सवालों का जवाब आपकी अपनी भाषा में देता है। आधुनिक AI तकनीक से संचालित, यह आपकी हर जरूरत को समझता है।
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a href="/chat">
                <button className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg text-base font-medium hover:bg-purple-700 transition">
                  <FaComments className="mr-2" />
                  अभी चैट करें
                </button>
              </a>
              <a href="/about">
                <button className="inline-flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg text-base font-medium hover:bg-gray-100 transition">
                  और जानें
                </button>
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaComments className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">हिंदी चैटबॉट</h3>
                    <p className="text-gray-500">ऑनलाइन</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p>नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg rounded-tr-none ml-auto max-w-[80%]">
                    <p>मुझे हिंदी साहित्य के बारे में जानकारी चाहिए</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                    <p>हिंदी साहित्य भारत की समृद्ध सांस्कृतिक विरासत का एक महत्वपूर्ण हिस्सा है...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto py-16 px-4 bg-white rounded-t-3xl shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-12">विशेषताएँ</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <FaGlobe className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">पूर्ण हिंदी समर्थन</h3>
            <p className="text-gray-600">पूरी तरह से हिंदी में संवाद करें। हमारा चैटबॉट आपकी भाषा को समझता है और उसी में जवाब देता है।</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <FaLightbulb className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">स्मार्ट उत्तर</h3>
            <p className="text-gray-600">AI तकनीक से संचालित, चैटबॉट आपके प्रश्नों के सटीक और उपयोगी उत्तर देता है।</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <FaFileAlt className="text-purple-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ज्ञान आधार</h3>
            <p className="text-gray-600">विशेष ज्ञान आधार से जुड़ा हुआ, जिससे आपको विशिष्ट जानकारी मिल सके।</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">अभी शुरू करें</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          हमारे हिंदी चैटबॉट के साथ अपने सवालों के जवाब पाएं। बिल्कुल मुफ्त, बिना किसी पंजीकरण के।
        </p>
        <a href="/chat">
          <button className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg text-base font-medium hover:bg-purple-700 transition">
            <FaComments className="mr-2" />
            अभी चैट करें
          </button>
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">हिंदी चैटबॉट</h2>
              <p className="text-gray-400 mt-2">आपके सवालों के हिंदी में जवाब</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="/about" className="text-gray-300 hover:text-white">हमारे बारे में</a>
              <a href="/privacy" className="text-gray-300 hover:text-white">गोपनीयता नीति</a>
              <a href="/terms" className="text-gray-300 hover:text-white">नियम और शर्तें</a>
              <a href="/contact" className="text-gray-300 hover:text-white">संपर्क करें</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} हिंदी चैटबॉट। सर्वाधिकार सुरक्षित।</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
