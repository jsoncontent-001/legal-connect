// src/components/home/Hero.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
              {currentUser?.role === "lawyer" ? (
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: "13px 26px", fontSize: "0.95rem" }}>
                  Find Customers <ArrowRight size={16} />
                </Link>
              ) : (
                <>
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
                </>
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
