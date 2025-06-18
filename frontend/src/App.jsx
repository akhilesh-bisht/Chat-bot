import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import About from "./pages/About";
import Chat from "./components/Chat";
import FileUpload from "./components/FileUpload";

function App() {
  return (
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
            <Route path="/chat" element={<Chat />} />
                <Route path="/upload" element={<FileUpload/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
