// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LawyerProvider } from "./contexts/LawyerContext";
import { ChatProvider } from "./contexts/ChatContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import LawyersPage from "./pages/LawyersPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import LawyerRegistration from "./components/lawyers/LawyerRegistration";
import ChatModal from "./components/chat/ChatModal";

function App() {
  return (
    <LanguageProvider>
      <LawyerProvider>
        <ChatProvider>
          <BrowserRouter>
            <div className="app">
              <Header />
              <main className="app-main">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/lawyers" element={<LawyersPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <LawyerRegistration />
              <ChatModal />
            </div>
          </BrowserRouter>
        </ChatProvider>
      </LawyerProvider>
    </LanguageProvider>
  );
}

export default App;
