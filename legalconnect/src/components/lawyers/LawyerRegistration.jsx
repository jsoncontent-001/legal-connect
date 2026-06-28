// src/components/lawyers/LawyerRegistration.jsx
import React, { useState, useContext } from "react";
import { X, Scale, User, Briefcase, Loader } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import { LawyerContext } from "../../contexts/LawyerContext";
import { validateRegistration, validateLogin } from "../../utils/validators";
import { SPECIALIZATIONS, LOCATIONS } from "../../utils/helpers";

const LawyerRegistration = () => {
  const { t } = useLanguage();
  const { authModal, setAuthModal, login, register, authLoading } = useContext(LawyerContext);
  const isLogin = authModal === "login";

  const [form, setForm] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
    role: "customer", specialization: "", experience: "", hourlyRate: "",
    location: "", barNumber: "", bio: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  if (!authModal) return null;

  const update = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const errs = isLogin ? validateLogin(form) : validateRegistration(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    if (isLogin) {
      const result = await login(form.email, form.password);
      if (!result.success) setServerError(result.error);
    } else {
      const result = await register(form);
      if (!result.success) setServerError(result.error);
      else if (result.success && !isLogin) {
        // Show email confirmation notice for Supabase
        setServerError("✅ Account created! Check your email to confirm, then log in.");
      }
    }
  };

  return (
    <div className="overlay" onClick={() => setAuthModal(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{
          background: "var(--navy)", padding: "28px", display: "flex",
          alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--white)" }}>
            <Scale size={20} color="var(--gold)" />
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                {isLogin ? t.auth.login_title : t.auth.register_title}
              </h2>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>LegalConnect</p>
            </div>
          </div>
          <button onClick={() => setAuthModal(null)} style={{ color: "rgba(255,255,255,0.6)", display: "flex", padding: "4px", borderRadius: "6px" }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
          {serverError && (
            <div style={{
              background: serverError.startsWith("✅") ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${serverError.startsWith("✅") ? "#bbf7d0" : "#fecaca"}`,
              color: serverError.startsWith("✅") ? "#166534" : "#b91c1c",
              padding: "10px 14px", borderRadius: "var(--radius)", fontSize: "0.85rem",
              marginBottom: "16px"
            }}>
              {serverError}
            </div>
          )}

          {!isLogin && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--gray-600)", marginBottom: "10px" }}>
                I am joining as:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {[
                  { value: "customer", label: t.auth.role_customer, icon: User },
                  { value: "lawyer", label: t.auth.role_lawyer, icon: Briefcase },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value} type="button" onClick={() => update("role", value)}
                    style={{
                      padding: "12px", border: `2px solid ${form.role === value ? "var(--navy)" : "var(--gray-200)"}`,
                      borderRadius: "var(--radius)",
                      background: form.role === value ? "rgba(26,46,74,0.05)" : "transparent",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    <Icon size={20} color={form.role === value ? "var(--navy)" : "var(--gray-400)"} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 500, color: form.role === value ? "var(--navy)" : "var(--gray-600)", textAlign: "center" }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">{t.auth.full_name}</label>
              <input className={`form-input${errors.fullName ? " error" : ""}`} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Jane Doe" />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">{t.auth.email}</label>
            <input className={`form-input${errors.email ? " error" : ""}`} type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">{t.auth.password}</label>
            <input className={`form-input${errors.password ? " error" : ""}`} type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="••••••••" />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">{t.auth.confirm_password}</label>
              <input className={`form-input${errors.confirmPassword ? " error" : ""}`} type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="••••••••" />
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
            </div>
          )}

          {!isLogin && form.role === "lawyer" && (
            <>
              <div style={{ height: "1px", background: "var(--gray-200)", margin: "8px 0 16px" }} />
              <p style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                Professional Details
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                <div className="form-group">
                  <label className="form-label">{t.auth.specialization}</label>
                  <select className={`form-input${errors.specialization ? " error" : ""}`} value={form.specialization} onChange={(e) => update("specialization", e.target.value)}>
                    <option value="">Select...</option>
                    {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.specialization && <span className="form-error">{errors.specialization}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">{t.auth.location}</label>
                  <select className={`form-input${errors.location ? " error" : ""}`} value={form.location} onChange={(e) => update("location", e.target.value)}>
                    <option value="">Select...</option>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.location && <span className="form-error">{errors.location}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">{t.auth.experience}</label>
                  <input className="form-input" type="number" min="0" value={form.experience} onChange={(e) => update("experience", e.target.value)} placeholder="5" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.auth.hourly_rate}</label>
                  <input className="form-input" type="number" min="0" value={form.hourlyRate} onChange={(e) => update("hourlyRate", e.target.value)} placeholder="150" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t.auth.bar_number}</label>
                <input className={`form-input${errors.barNumber ? " error" : ""}`} value={form.barNumber} onChange={(e) => update("barNumber", e.target.value)} placeholder="BAR-123456" />
                {errors.barNumber && <span className="form-error">{errors.barNumber}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">{t.auth.bio}</label>
                <textarea className="form-input" rows={3} value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Brief professional biography..." style={{ resize: "vertical" }} />
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: "0.95rem", marginTop: "8px" }}
            disabled={authLoading}
          >
            {authLoading
              ? <><Loader size={15} style={{ animation: "spin 1s linear infinite" }} /> Please wait...</>
              : isLogin ? t.auth.login_btn : t.auth.register_btn
            }
          </button>

          <p style={{ textAlign: "center", fontSize: "0.84rem", color: "var(--gray-600)", marginTop: "16px" }}>
            {isLogin ? t.auth.no_account : t.auth.have_account}{" "}
            <button type="button" onClick={() => { setAuthModal(isLogin ? "register" : "login"); setServerError(""); setErrors({}); }}
              style={{ color: "var(--navy)", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>
              {isLogin ? t.auth.sign_up : t.auth.sign_in}
            </button>
          </p>
        </form>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
};

export default LawyerRegistration;
