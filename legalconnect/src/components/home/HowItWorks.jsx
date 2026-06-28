// src/components/home/HowItWorks.jsx
import React, { useContext } from "react";
import { UserPlus, Search, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import { LawyerContext } from "../../contexts/LawyerContext";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Your Account",
    desc: "Register as a client in under 60 seconds. No credit card required to browse.",
  },
  {
    icon: Search,
    number: "02",
    title: "Find Your Lawyer",
    desc: "Search and filter hundreds of verified lawyers by specialization, location, and rate.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Start Chatting",
    desc: "Message a lawyer directly from their profile. Explain your situation confidentially.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Get Legal Help",
    desc: "Book a formal consultation or get quick advice — on your schedule, at your budget.",
  },
];

const HowItWorks = () => {
  const { setAuthModal, currentUser } = useContext(LawyerContext);

  return (
    <section className="section" style={{ background: "var(--white)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <span className="section-label">Process</span>
            <h2 className="section-title">How LegalConnect Works</h2>
            <p className="section-sub" style={{ marginBottom: "40px" }}>
              Getting legal help has never been this simple. Four steps to connecting with the right lawyer.
            </p>
            {!currentUser && (
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setAuthModal("register")}
                  className="btn btn-primary"
                  style={{ padding: "12px 24px" }}
                >
                  Get Started <ArrowRight size={15} />
                </button>
                <a href="/lawyers" className="btn btn-outline" style={{ padding: "12px 24px" }}>
                  Browse Lawyers
                </a>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {steps.map(({ icon: Icon, number, title, desc }, i) => (
              <div key={i} style={{ display: "flex", gap: "20px", padding: "20px 0", borderBottom: i < steps.length - 1 ? "1px solid var(--gray-100)" : "none" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "12px",
                    background: "linear-gradient(135deg, var(--navy), var(--navy-light))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold)",
                  }}>
                    <Icon size={19} />
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: 1, height: 24, background: "var(--gray-200)", marginTop: "4px" }} />
                  )}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>
                    Step {number}
                  </div>
                  <h3 style={{ fontWeight: 600, color: "var(--navy)", marginBottom: "6px", fontSize: "0.95rem" }}>{title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
