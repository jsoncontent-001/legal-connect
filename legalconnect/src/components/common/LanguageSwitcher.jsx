// src/components/common/LanguageSwitcher.jsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {["en", "sw"].map((lang) => (
        <button
          key={lang}
          onClick={() => switchLanguage(lang)}
          style={{
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 500,
            background: language === lang ? "rgba(201,150,58,0.25)" : "transparent",
            color: language === lang ? "var(--gold-light)" : "rgba(255,255,255,0.5)",
            border: language === lang ? "1px solid rgba(201,150,58,0.4)" : "1px solid transparent",
            transition: "all 0.2s ease",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-mono)",
          }}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
