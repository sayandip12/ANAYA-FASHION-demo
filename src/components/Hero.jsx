import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../config/imageConfig';
import Navbar from './Navbar';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <video autoPlay loop muted playsInline className="hero-video" src="/assets/videos/anaya-hero.mp4"></video>
        <div className="hero-overlay"></div>
      </div>
      
      <Navbar />
      
      <div className="hero-content container">
        <div className="hero-text-content">
          <h2 className="hero-brand">ANAYA</h2>
          <h1 className="hero-title">
            DRESS THE<br />
            MOMENT
          </h1>
          <p className="hero-subtitle">Tradition. Style. You.</p>
          
          <Link to="/occasions">
            <button className="hero-cta">
              EXPLORE OCCASIONS
              <span className="button-arrow">→</span>
            </button>
          </Link>
        </div>
        
        <div className="hero-scroll-indicator">
          <span className="scroll-text">SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
