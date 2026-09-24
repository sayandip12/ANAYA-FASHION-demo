import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreConfig } from '../hooks/useStoreConfig';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { config } = useStoreConfig();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        
        <div className="footer-col footer-brand">
          <div className="footer-logo">{config?.name || 'ANAYA'}</div>
          <div className="footer-tagline">{config?.tagline || 'WEAR THE MOMENT'}</div>
        </div>
        
        <div className="footer-col footer-nav">
          <h4 className="footer-title">Navigation</h4>
          <div className="footer-links">
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/occasions">Occasions</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
        
        <div className="footer-col footer-contact">
          <h4 className="footer-title">Contact</h4>
          <div className="footer-links">
            <p className="footer-text">{config?.phone || ''}</p>
            <p className="footer-text">{config?.address || ''}</p>
          </div>
        </div>

        <div className="footer-col footer-map">
          <h4 className="footer-title">Location</h4>
          {config?.address ? (
            <div className="footer-map-wrapper">
              <iframe 
                src={`https://maps.google.com/maps?q=ANAYA Fashion, ${encodeURIComponent(config.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="ANAYA Store Location"
              ></iframe>
            </div>
          ) : (
            <div className="footer-map-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', padding: '1rem' }}>
              <h5 style={{ color: '#000', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>ANAYA</h5>
              {config?.mapEmbedUrl && (
                <a href={config.mapEmbedUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', textDecoration: 'none', color: 'var(--color-primary)' }}>
                  View on Google Maps →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="footer-bottom">
        © {currentYear} {config?.name || 'ANAYA'}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
