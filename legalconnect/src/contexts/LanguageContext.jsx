// src/contexts/LanguageContext.jsx
import React, { createContext, useState } from "react";
import { translations } from "../utils/translations";
import { storage } from "../services/localStorageService";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(storage.get("language") || "en");

  const t = translations[language] || translations.en;

  const switchLanguage = (lang) => {
    setLanguage(lang);
    storage.set("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
