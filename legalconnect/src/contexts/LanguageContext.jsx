// src/contexts/LanguageContext.jsx
import React, { createContext, useState } from "react";
import { translations } from "../utils/translations";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("legalconnect_language") || "en"
  );

  const t = translations[language] || translations.en;

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("legalconnect_language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
