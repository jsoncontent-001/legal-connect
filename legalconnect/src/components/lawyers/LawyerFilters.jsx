// src/components/lawyers/LawyerFilters.jsx
import React from "react";
import "../../styles/pages/LawyersPage.css";
import { useLanguage } from "../../hooks/useLanguage";
import { SPECIALIZATIONS, LOCATIONS } from "../../utils/helpers";

const LawyerFilters = ({ filters, onChange, count }) => {
  const { t } = useLanguage();

  return (
    <div className="lawyers-filters">
      <div className="container">
        <div className="filters-inner">
          <select
            className="filter-select"
            value={filters.specialization}
            onChange={(e) => onChange({ ...filters, specialization: e.target.value })}
          >
            <option value="all">{t.lawyers.filter_all}</option>
            {SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filters.location}
            onChange={(e) => onChange({ ...filters, location: e.target.value })}
          >
            <option value="all">{t.lawyers.filter_location}</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select
            className="filter-select"
            value={filters.availability}
            onChange={(e) => onChange({ ...filters, availability: e.target.value })}
          >
            <option value="all">Any Availability</option>
            <option value="available">Available Now</option>
            <option value="busy">Busy</option>
          </select>
          <span className="filter-count">{count} lawyer{count !== 1 ? "s" : ""} found</span>
        </div>
      </div>
    </div>
  );
};

export default LawyerFilters;
