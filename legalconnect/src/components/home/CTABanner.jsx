// src/components/home/CTABanner.jsx
import React, { useContext } from "react";
import { ArrowRight, Shield, Clock, Lock } from "lucide-react";
import { LawyerContext } from "../../contexts/LawyerContext";
import { useLanguage } from "../../hooks/useLanguage";

const trust = [
  { icon: Shield, label: "Verified Lawyers" },
  { icon: Clock, label: "Fast Response" },
  { icon: Lock, label: "100% Confidential" },
];

const CTABanner = () => {
  const { setAuthModal, currentUser } = useContext(LawyerContext);
  const { t } = useLanguage();

  return (
    <section style={{
      background: "linear-gradient(135deg, var(--navy) 0%, #0f1e32 100%)",
      padding: "80px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* decorative circle */}
      <div style={{
        position: "absolute", right: "-80px", top: "-80px",
        width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,150,58,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <span style={{
          display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)",
          marginBottom: "16px",
        }}>
          Justice for Everyone
        </span>
        <h2 style={{
          fontFamily: "var(--font-display)", color: "var(--white)",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700,
          marginBottom: "16px", lineHeight: 1.2,
        }}>
          Don't face legal challenges alone.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1rem", maxWidth: "480px", margin: "0 auto 36px", lineHeight: 1.7 }}>
          Whether it's a quick question or a complex case, our network of verified lawyers is ready to help you today.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
          {!currentUser ? (
            <>
              <button
                onClick={() => setAuthModal("register")}
                className="btn btn-primary"
                style={{ padding: "13px 28px", fontSize: "0.95rem" }}
              >
                Start for Free <ArrowRight size={15} />
              </button>
              <a href="/lawyers" className="btn btn-ghost" style={{ padding: "13px 28px", fontSize: "0.95rem" }}>
                Browse Lawyers
              </a>
            </>
          ) : (
            <a href="/lawyers" className="btn btn-primary" style={{ padding: "13px 28px", fontSize: "0.95rem" }}>
              Find a Lawyer Now <ArrowRight size={15} />
            </a>
          )}
        </div>

        <div style={{ display: "flex", gap: "32px", justifyContent: "center", flexWrap: "wrap" }}>
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}>
              <Icon size={14} color="var(--gold)" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
