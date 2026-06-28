// src/components/testimonials/TestimonialSlide.jsx
import React from "react";
import { Star, Quote } from "lucide-react";
import { getInitials } from "../../utils/helpers";

const TestimonialSlide = ({ testimonial }) => (
  <div style={{
    background: "var(--white)", borderRadius: "var(--radius-lg)", padding: "32px",
    border: "1px solid var(--gray-200)", position: "relative",
  }}>
    <Quote size={28} color="var(--gold)" style={{ opacity: 0.3, position: "absolute", top: 24, right: 24 }} />
    <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />)}
    </div>
    <p style={{ color: "var(--gray-600)", lineHeight: 1.7, marginBottom: "24px", fontStyle: "italic" }}>
      "{testimonial.text}"
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{
        width: 42, height: 42, borderRadius: "50%",
        background: "linear-gradient(135deg, var(--navy), var(--navy-light))",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--white)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.88rem"
      }}>
        {getInitials(testimonial.name)}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.9rem" }}>{testimonial.name}</div>
        <div style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>{testimonial.role}</div>
      </div>
      <div style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--gray-400)" }}>
        via {testimonial.lawyerName}
      </div>
    </div>
  </div>
);

export default TestimonialSlide;
