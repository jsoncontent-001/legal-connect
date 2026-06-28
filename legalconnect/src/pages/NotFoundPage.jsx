// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Scale, ArrowLeft } from "lucide-react";

const NotFoundPage = () => (
  <div style={{
    paddingTop: "64px", minHeight: "100vh", background: "var(--navy)",
    display: "flex", alignItems: "center", justifyContent: "center",
    textAlign: "center", padding: "80px 24px",
  }}>
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
        <div style={{
          width: 80, height: 80, background: "rgba(201,150,58,0.12)",
          border: "1px solid rgba(201,150,58,0.25)", borderRadius: "20px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Scale size={36} color="var(--gold)" />
        </div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.14em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "16px" }}>
        Error 404
      </div>
      <h1 style={{ fontFamily: "var(--font-display)", color: "var(--white)", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, marginBottom: "16px" }}>
        Page Not Found
      </h1>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: "400px", margin: "0 auto 36px", lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/" className="btn btn-primary" style={{ padding: "12px 26px" }}>
          <ArrowLeft size={15} /> Back to Home
        </Link>
        <Link to="/lawyers" className="btn btn-ghost" style={{ padding: "12px 26px" }}>
          Find a Lawyer
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
