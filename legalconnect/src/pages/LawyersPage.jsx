// src/pages/LawyersPage.jsx
import React from "react";
import LawyerDirectory from "../components/lawyers/LawyerDirectory";
import "../styles/pages/LawyersPage.css";

const LawyersPage = () => (
  <div className="lawyers-page">
    <LawyerDirectory />
  </div>
);

export default LawyersPage;
