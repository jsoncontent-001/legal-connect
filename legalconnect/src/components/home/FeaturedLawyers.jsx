// src/components/home/FeaturedLawyers.jsx
import React, { useContext } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LawyerContext } from "../../contexts/LawyerContext";
import LawyerCard from "../lawyers/LawyerCard";

const FeaturedLawyers = () => {
  const { lawyers } = useContext(LawyerContext);
  const featured = lawyers.filter((l) => l.available).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section className="section" style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="section-label">Available Now</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Featured Lawyers</h2>
          </div>
          <Link to="/lawyers" className="btn btn-outline" style={{ padding: "9px 20px" }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {featured.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyers;
