// src/components/home/Hero.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, CheckCircle } from "lucide-react";
import "../../styles/pages/HomePage.css";
import { useLanguage } from "../../hooks/useLanguage";
import { LawyerContext } from "../../contexts/LawyerContext";

const Hero = () => {
  const { t } = useLanguage();
  const { setAuthModal, currentUser } = useContext(LawyerContext);

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid-lines" />
      <div className="container">
        <div className="hero-content">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              {t.hero.badge}
            </div>
            <h1 className="hero-headline">
              {t.hero.headline.split("\n").map((line, i) =>
                i === 1 ? <em key={i}>{line}</em> : <span key={i}>{line}<br /></span>
              )}
            </h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-actions">
              <Link to="/lawyers" className="btn btn-primary" style={{ padding: "13px 26px", fontSize: "0.95rem" }}>
                {t.hero.cta_primary} <ArrowRight size={16} />
              </Link>
              {!currentUser && (
                <button
                  onClick={() => setAuthModal("register")}
                  className="btn btn-ghost"
                  style={{ padding: "13px 26px", fontSize: "0.95rem" }}
                >
                  {t.hero.cta_secondary}
                </button>
              )}
            </div>
            <div className="hero-stats">
              {[
                { value: "500+", label: t.hero.stat1_label },
                { value: "12K+", label: t.hero.stat2_label },
                { value: "98%", label: t.hero.stat3_label },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="hero-stat-value">{value}</div>
                  <div className="hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-stack">
              <div className="hero-float-badge badge-1">
                <CheckCircle size={14} color="var(--success)" />
                Verified & Licensed
              </div>
              <div className="hero-main-card">
                <div className="hero-card-lawyer">
                  <div className="hero-card-avatar">SM</div>
                  <div>
                    <div className="hero-card-name">Sarah Mitchell</div>
                    <div className="hero-card-spec">Family Law • New York</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="var(--gold)" color="var(--gold)" />)}
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginLeft: "4px" }}>4.9 (87)</span>
                </div>
                <div className="hero-card-divider" />
                <div className="hero-card-stats">
                  {[
                    { val: "12yr", lbl: "Experience" },
                    { val: "$180", lbl: "Per Hour" },
                    { val: "200+", lbl: "Cases Won" },
                  ].map(({ val, lbl }) => (
                    <div key={lbl}>
                      <div className="hero-card-stat-val">{val}</div>
                      <div className="hero-card-stat-lbl">{lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <div style={{
                    width: "100%", padding: "11px", background: "var(--gold)",
                    borderRadius: "var(--radius)", textAlign: "center",
                    color: "var(--navy)", fontWeight: 600, fontSize: "0.88rem"
                  }}>
                    Chat Now →
                  </div>
                </div>
              </div>
              <div className="hero-float-badge badge-2">
                <Shield size={14} color="var(--gold)" />
                Confidential & Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
