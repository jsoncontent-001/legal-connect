// src/components/testimonials/Testimonials.jsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import TestimonialSlide from "./TestimonialSlide";
import { SEED_TESTIMONIALS } from "../../utils/helpers";

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section className="section" style={{ background: "var(--cream)" }}>
      <div className="container">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">{t.testimonials.title}</h2>
        <p className="section-sub" style={{ marginBottom: "40px" }}>{t.testimonials.sub}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {SEED_TESTIMONIALS.map((t) => <TestimonialSlide key={t.id} testimonial={t} />)}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
