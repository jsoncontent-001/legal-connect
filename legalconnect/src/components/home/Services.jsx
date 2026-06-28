// src/components/home/Services.jsx
import React from "react";
import { Scale, Users, Briefcase, Home, Globe, Lightbulb } from "lucide-react";
import "../../styles/pages/HomePage.css";
import { useLanguage } from "../../hooks/useLanguage";

const icons = [Scale, Users, Briefcase, Home, Globe, Lightbulb];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section className="section services">
      <div className="container">
        <span className="section-label">What We Cover</span>
        <h2 className="section-title">{t.services.title}</h2>
        <p className="section-sub">{t.services.sub}</p>
        <div className="services-grid">
          {t.services.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="service-card">
                <div className="service-icon">
                  <Icon size={20} />
                </div>
                <h3 className="service-title">{item.title}</h3>
                <p className="service-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
