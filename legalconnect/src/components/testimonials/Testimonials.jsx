// src/components/testimonials/Testimonials.jsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { Shield, Clock, Star, MessageCircle, Search, Lock, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Lawyers Only",
    desc: "Every lawyer on our platform is verified with a valid bar registration number before being listed.",
  },
  {
    icon: Star,
    title: "Rated & Reviewed",
    desc: "Clients leave honest reviews after every case, helping you choose the right lawyer with confidence.",
  },
  {
    icon: MessageCircle,
    title: "Real-Time Chat",
    desc: "Message your lawyer directly through our secure chat system — no phone tag, no waiting rooms.",
  },
  {
    icon: Search,
    title: "Smart Search & Filters",
    desc: "Filter lawyers by specialization, location, availability, and hourly rate to find your perfect match.",
  },
  {
    icon: Lock,
    title: "100% Confidential",
    desc: "All conversations are private and protected. Your legal matters stay between you and your lawyer.",
  },
  {
    icon: Clock,
    title: "Available When You Need",
    desc: "See which lawyers are available right now and start a conversation within minutes.",
  },
  {
    icon: Award,
    title: "Multiple Specializations",
    desc: "From criminal law to immigration, corporate law to family disputes — we cover every legal area.",
  },
  {
    icon: Users,
    title: "For Lawyers Too",
    desc: "Lawyers can register, set their rate, manage availability, and receive clients directly through the platform.",
  },
];

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="section" style={{ background: "var(--cream)" }}>
      <div className="container">
        <span className="section-label">Why LegalConnect</span>
        <h2 className="section-title">Everything You Need,<br />In One Platform</h2>
        <p className="section-sub" style={{ marginBottom: "48px" }}>
          Built for clients who need legal help fast and lawyers who want to grow their practice.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              background: "var(--white)",
              borderRadius: "var(--radius-lg)",
              padding: "28px",
              border: "1px solid var(--gray-200)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--gray-200)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 44, height: 44,
                background: "linear-gradient(135deg, var(--navy), var(--navy-light))",
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px", color: "var(--gold)",
              }}>
                <Icon size={20} />
              </div>
              <h3 style={{ fontWeight: 600, color: "var(--navy)", marginBottom: "8px", fontSize: "0.95rem" }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--gray-600)", lineHeight: 1.65 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
