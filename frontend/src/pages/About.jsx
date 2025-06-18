import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold">हमारे बारे में</h1>
        <p className="text-gray-600 mt-2">हिंदी चैटबॉट का उद्देश्य और विशेषताएँ</p>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-10 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-4">हम कौन हैं?</h2>
          <p className="text-gray-700 leading-relaxed">
            हिंदी चैटबॉट एक एआई आधारित डिजिटल सहायक है, जिसे खास तौर पर हिंदी भाषा में संवाद के लिए डिज़ाइन किया गया है।
            इसका उद्देश्य भारत और अन्य हिंदी-भाषी समुदायों को उनकी भाषा में डिजिटल सहायता प्रदान करना है।
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">हमारा लक्ष्य</h2>
          <p className="text-gray-700 leading-relaxed">
            हमारा मुख्य लक्ष्य यह सुनिश्चित करना है कि तकनीकी और एआई समाधान भाषा की दीवारों को तोड़ते हुए सभी तक पहुँच सकें।
            हम चाहते हैं कि हर कोई अपनी भाषा में जानकारी प्राप्त कर सके — सरल, सहज और सटीक रूप में।
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">प्रमुख विशेषताएँ</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>100% हिंदी संवाद और समर्थन</li>
            <li>सटीक और उपयोगी उत्तर देने वाला स्मार्ट एआई</li>
            <li>सरल उपयोगकर्ता इंटरफेस</li>
            <li>कोई पंजीकरण या भुगतान आवश्यक नहीं</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">संपर्क करें</h2>
          <p className="text-gray-700 leading-relaxed">
            यदि आपके कोई सुझाव, प्रश्न या समस्याएँ हैं, तो आप हमें <a href="/contact" className="text-purple-600 underline">यहाँ</a> संपर्क कर सकते हैं।
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} हिंदी चैटबॉट — सभी अधिकार सुरक्षित।
      </footer>
    </div>
  );
}

export default About;
