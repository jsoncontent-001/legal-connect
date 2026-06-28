// src/components/lawyers/LawyerDirectory.jsx
import React, { useState, useContext, useEffect, useCallback } from "react";
import { Search, Loader } from "lucide-react";
import "../../styles/pages/LawyersPage.css";
import { useLanguage } from "../../hooks/useLanguage";
import { LawyerContext } from "../../contexts/LawyerContext";
import LawyerCard from "./LawyerCard";
import LawyerFilters from "./LawyerFilters";

const LawyerDirectory = () => {
  const { t } = useLanguage();
  const { lawyers, filterLawyers, loading } = useContext(LawyerContext);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ specialization: "all", location: "all", availability: "all" });
  const [filtered, setFiltered] = useState([]);
  const [filtering, setFiltering] = useState(false);

  const runFilter = useCallback(async () => {
    setFiltering(true);
    const results = await filterLawyers({ search, ...filters });
    setFiltered(results);
    setFiltering(false);
  }, [search, filters, filterLawyers]);

  // Re-run when lawyers list updates from Supabase real-time
  useEffect(() => { runFilter(); }, [lawyers, runFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    runFilter();
  };

  const isLoading = loading || filtering;

  return (
    <>
      <div className="lawyers-hero">
        <div className="container">
          <span className="section-label" style={{ color: "var(--gold-light)" }}>Directory</span>
          <h1 className="lawyers-hero-title">{t.lawyers.title}</h1>
          <p className="lawyers-hero-sub">Browse verified legal professionals across all practice areas.</p>
          <form onSubmit={handleSearchSubmit} className="lawyers-search-bar">
            <input
              type="text"
              className="lawyers-search-input"
              placeholder={t.lawyers.search_placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="lawyers-search-btn">
              <Search size={16} /> Search
            </button>
          </form>
        </div>
      </div>

      <LawyerFilters filters={filters} onChange={setFilters} count={filtered.length} />

      <div className="container">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "80px 0", gap: "12px", color: "var(--gray-400)" }}>
            <Loader size={20} style={{ animation: "spin 1s linear infinite" }} />
            Loading lawyers...
          </div>
        ) : (
          <div className="lawyers-grid">
            {filtered.length > 0 ? (
              filtered.map((lawyer) => <LawyerCard key={lawyer.id} lawyer={lawyer} />)
            ) : (
              <div className="lawyers-empty" style={{ gridColumn: "1 / -1" }}>
                <h3>No lawyers found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default LawyerDirectory;
