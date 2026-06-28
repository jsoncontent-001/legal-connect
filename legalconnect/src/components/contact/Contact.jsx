// src/components/contact/Contact.jsx
import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import ContactForm from "./ContactForm";

const Contact = () => {
  const { t } = useLanguage();

  const info = [
    { icon: MapPin, label: "Address", value: t.contact.address },
    { icon: Phone, label: "Phone", value: t.contact.phone },
    { icon: Mail, label: "Email", value: "hello@legalconnect.com" },
    { icon: Clock, label: "Hours", value: t.contact.hours },
  ];

  return (
    <section className="section" style={{ background: "var(--cream)", paddingTop: "120px" }}>
      <div className="container">
        <span className="section-label">Get In Touch</span>
        <h1 className="section-title">{t.contact.title}</h1>
        <p className="section-sub" style={{ marginBottom: "48px" }}>{t.contact.sub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "48px", alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
              {info.map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{
                    width: 40, height: 40, background: "var(--navy)", borderRadius: "var(--radius)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold)", flexShrink: 0
                  }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>{label}</div>
                    <div style={{ color: "var(--gray-800)", fontWeight: 500, fontSize: "0.9rem" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              background: "var(--navy)", borderRadius: "var(--radius-lg)", padding: "24px",
              color: "var(--white)"
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.1em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "10px" }}>
                Emergency Legal Help
              </div>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Facing an urgent legal matter? Our emergency line connects you with an available lawyer within 15 minutes.
              </p>
              <div style={{ marginTop: "16px", fontWeight: 600, color: "var(--gold-light)", fontSize: "1.05rem" }}>
                1-800-LEGAL-NOW
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
