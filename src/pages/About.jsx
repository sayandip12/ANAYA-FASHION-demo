import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useStoreConfig } from '../hooks/useStoreConfig';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const { config } = useStoreConfig();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <Navbar />
      
      <header className="about-header">
        <h1 className="about-title">ABOUT ANAYA</h1>
        <p className="about-subtitle">"Where heritage meets the way you wear it."</p>
      </header>

      <section className="about-story">
        <div className="about-story-content">
          <p>
            ANAYA is a contemporary Indian fashion boutique created around the idea that traditional clothing can feel timeless, personal and beautifully modern.
          </p>
          <p>
            We bring together thoughtfully selected sarees, lehengas, ethnic wear, occasion dressing and refined menswear for moments worth remembering.
          </p>
        </div>
      </section>

      <section className="about-philosophy">
        <h2 className="section-heading">OUR PHILOSOPHY</h2>
        <div className="philosophy-grid">
          <div className="philosophy-block">
            <h3>CRAFT</h3>
            <p>Thoughtfully selected pieces with attention to detail.</p>
          </div>
          <div className="philosophy-block">
            <h3>OCCASION</h3>
            <p>Clothing for weddings, celebrations, festivities and meaningful moments.</p>
          </div>
          <div className="philosophy-block">
            <h3>PERSONAL</h3>
            <p>A boutique experience centered around individual styling and choice.</p>
          </div>
        </div>
      </section>

      <section className="about-offerings">
        <h2 className="section-heading">WHAT WE OFFER</h2>
        <div className="offerings-split">
          <div className="offerings-col">
            <h3>WOMEN</h3>
            <ul>
              <li>Sarees</li>
              <li>Designer Sarees</li>
              <li>Bridal Sarees</li>
              <li>Lehengas</li>
              <li>Bridal Lehengas</li>
              <li>Kurtis</li>
              <li>Kurti Sets</li>
              <li>Anarkali</li>
              <li>Party Dresses</li>
              <li>Ethnic Wear</li>
            </ul>
          </div>
          <div className="offerings-col">
            <h3>MEN</h3>
            <ul>
              <li>Blazers</li>
              <li>Suits</li>
              <li>Panjabi</li>
              <li>Kurta</li>
              <li>Sherwani</li>
              <li>Wedding Wear</li>
              <li>Party Wear</li>
              <li>Formal Wear</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-boutique">
        <h2 className="section-heading">THE BOUTIQUE</h2>
        <div className="boutique-info">
          <h3>{config?.name || 'ANAYA'} BOUTIQUE</h3>
          <p>{config?.address || ''}</p>
          <p>Phone: {config?.phone || ''}</p>
          <Link to="/contact" className="boutique-cta">VISIT OUR STORE →</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
