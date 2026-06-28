// src/components/contact/ContactForm.jsx
import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { validateContact } from "../../utils/validators";

const ContactForm = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateContact(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "16px", padding: "48px", textAlign: "center",
        background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)"
      }}>
        <CheckCircle size={48} color="var(--success)" />
        <h3 style={{ color: "var(--navy)", fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>Message Sent!</h3>
        <p style={{ color: "var(--gray-600)" }}>We'll get back to you within 24 hours.</p>
        <button className="btn btn-primary" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: "var(--white)", borderRadius: "var(--radius-lg)",
      padding: "36px", border: "1px solid var(--gray-200)"
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <div className="form-group">
          <label className="form-label">{t.contact.name}</label>
          <input className={`form-input${errors.name ? " error" : ""}`} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label className="form-label">{t.contact.email}</label>
          <input className={`form-input${errors.email ? " error" : ""}`} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">{t.contact.subject}</label>
        <input className={`form-input${errors.subject ? " error" : ""}`} value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="How can we help?" />
        {errors.subject && <span className="form-error">{errors.subject}</span>}
      </div>
      <div className="form-group">
        <label className="form-label">{t.contact.message}</label>
        <textarea className={`form-input${errors.message ? " error" : ""}`} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your legal matter..." style={{ resize: "vertical" }} />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: "0.95rem" }}>
        <Send size={16} /> {t.contact.send}
      </button>
    </form>
  );
};

export default ContactForm;
