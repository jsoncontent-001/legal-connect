// src/pages/HomePage.jsx
import React from "react";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import HowItWorks from "../components/home/HowItWorks";
import FeaturedLawyers from "../components/home/FeaturedLawyers";
import Testimonials from "../components/testimonials/Testimonials";
import CTABanner from "../components/home/CTABanner";

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <HowItWorks />
    <FeaturedLawyers />
    <Testimonials />
    <CTABanner />
  </>
);

export default HomePage;
