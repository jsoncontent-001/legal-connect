// src/components/common/Header.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Scale } from "lucide-react";
import "../../styles/components/Header.css";
import { useLanguage } from "../../hooks/useLanguage";
import { LawyerContext } from "../../contexts/LawyerContext";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { getInitials } from "../../utils/helpers";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const { currentUser, setAuthModal, logout } = useContext(LawyerContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLawyer = currentUser?.role === "lawyer";

  const navLinks = [
    { to: "/", label: t.nav.home },
    ...(!isLawyer ? [{ to: "/lawyers", label: t.nav.lawyers }] : []),
    { to: "/services", label: t.nav.services },
    { to: "/contact", label: t.nav.contact },
    ...(currentUser ? [{ to: "/dashboard", label: t.nav.dashboard }] : []),
  ];

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="header-logo">
              <div className="logo-icon">
                <Scale size={18} />
              </div>
              <span className="logo-text">Legal<span>Connect</span></span>
            </Link>

            <nav className="header-nav">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link${location.pathname === to ? " active" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="header-actions">
              <LanguageSwitcher />
              {currentUser ? (
                <div className="user-info">
                  <div className="user-avatar">{getInitials(currentUser.fullName)}</div>
                  <Link to="/dashboard" className="user-name" style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem" }}>
                    {currentUser.fullName.split(" ")[0]}
                  </Link>
                  <span className="user-role-badge">{currentUser.role}</span>
                  <button
                    onClick={logout}
                    className="btn btn-ghost"
                    style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                  >
                    {t.nav.logout}
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => setAuthModal("login")} className="btn btn-ghost" style={{ padding: "7px 16px", fontSize: "0.85rem" }}>
                    {t.nav.login}
                  </button>
                  <button onClick={() => setAuthModal("register")} className="btn btn-primary" style={{ padding: "7px 18px", fontSize: "0.85rem" }}>
                    {t.nav.register}
                  </button>
                </>
              )}
              <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;
