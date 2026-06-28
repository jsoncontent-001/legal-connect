// src/components/common/MobileMenu.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { LawyerContext } from "../../contexts/LawyerContext";

const MobileMenu = ({ open, onClose }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const { currentUser, setAuthModal, logout } = useContext(LawyerContext);

  if (!open) return null;

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/lawyers", label: t.nav.lawyers },
    { to: "/services", label: t.nav.services },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 150,
        background: "rgba(26,46,74,0.95)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "40px" }}>
        <button
          onClick={onClose}
          style={{
            color: "var(--white)",
            padding: "8px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
          }}
        >
          <X size={22} />
        </button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={onClose}
            style={{
              padding: "16px 20px",
              color: location.pathname === to ? "var(--gold-light)" : "rgba(255,255,255,0.8)",
              fontSize: "1.1rem",
              fontWeight: 500,
              borderRadius: "var(--radius)",
              background: location.pathname === to ? "rgba(201,150,58,0.1)" : "transparent",
              transition: "all 0.2s",
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        {currentUser ? (
          <>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", padding: "8px 0" }}>
              Signed in as <strong style={{ color: "var(--white)" }}>{currentUser.fullName}</strong>
              <span style={{ marginLeft: "8px", fontSize: "0.72rem", background: "rgba(201,150,58,0.2)", color: "var(--gold-light)", padding: "2px 8px", borderRadius: "100px", border: "1px solid rgba(201,150,58,0.3)", textTransform: "capitalize" }}>
                {currentUser.role}
              </span>
            </div>
            <Link
              to="/dashboard"
              onClick={onClose}
              style={{
                padding: "13px 20px", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem",
                fontWeight: 500, borderRadius: "var(--radius)",
                background: "rgba(255,255,255,0.08)", display: "block", textAlign: "center",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {t.nav.dashboard}
            </Link>
            <button
              onClick={() => { logout(); onClose(); }}
              className="btn btn-ghost"
              style={{ justifyContent: "center" }}
            >
              {t.nav.logout}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setAuthModal("login"); onClose(); }}
              className="btn btn-ghost"
              style={{ justifyContent: "center" }}
            >
              {t.nav.login}
            </button>
            <button
              onClick={() => { setAuthModal("register"); onClose(); }}
              className="btn btn-primary"
              style={{ justifyContent: "center" }}
            >
              {t.nav.register}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
