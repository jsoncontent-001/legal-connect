// src/pages/ServicesPage.jsx
import React from "react";
import Services from "../components/home/Services";
import { Scale, Users, Briefcase, Home, Globe, Lightbulb, ArrowRight } from "lucide-react";

const ServicesPage = () => (
  <div style={{ paddingTop: "64px" }}>
    <div style={{ background: "var(--navy)", padding: "56px 0 40px" }}>
      <div className="container">
        <span className="section-label" style={{ color: "var(--gold-light)" }}>Our Expertise</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "var(--white)", fontWeight: 700, marginBottom: "12px" }}>
          Legal Services We Offer
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "480px" }}>
          From personal legal matters to complex corporate disputes, our network of verified lawyers covers every domain.
        </p>
      </div>
    </div>
    <Services />
    <section className="section" style={{ background: "var(--navy)", textAlign: "center" }}>
      <div className="container">
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--white)", fontSize: "2rem", marginBottom: "12px" }}>
          Ready to find your lawyer?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "28px" }}>Connect with a verified legal professional in minutes.</p>
        <a href="/lawyers" className="btn btn-primary" style={{ padding: "13px 28px", fontSize: "0.95rem" }}>
          Browse Lawyers <ArrowRight size={16} />
        </a>
      </div>
    </section>
  </div>
);

export default ServicesPage;
