// src/components/common/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Scale, Mail, Phone, MapPin } from "lucide-react";
import "../../styles/components/Footer.css";
import { useLanguage } from "../../hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="header-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: 34, height: 34, background: "var(--gold)", borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)"
              }}>
                <Scale size={18} />
              </div>
              <span className="logo-text">Legal<span>Connect</span></span>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
                <MapPin size={13} /> {t.contact.address}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
                <Phone size={13} /> {t.contact.phone}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
                <Mail size={13} /> hello@legalconnect.com
              </div>
            </div>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/lawyers">Find Lawyers</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Practice Areas</h4>
            <ul>
              <li><a href="#">Criminal Law</a></li>
              <li><a href="#">Family Law</a></li>
              <li><a href="#">Corporate Law</a></li>
              <li><a href="#">Immigration</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LegalConnect. {t.footer.rights}</span>
          <span>Built with care for equal access to justice.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
