import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-brand">
          <div className="footer-logo">ANAYA</div>
          <div className="footer-tagline">{BUSINESS_CONFIG.tagline}</div>
          <div className="footer-copyright mobile-hidden">
            © {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
          </div>
        </div>
        
        <div className="footer-links-section">
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/occasions">Occasions</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
        
        <div className="footer-social-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="footer-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <div className="footer-slogan mobile-hidden">
            Elegance for every you.
          </div>
        </div>
        
        <div className="footer-copyright desktop-hidden">
          © {currentYear} {BUSINESS_CONFIG.name}. All rights reserved.
        </div>
        <div className="footer-slogan desktop-hidden">
          Elegance for every you.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
