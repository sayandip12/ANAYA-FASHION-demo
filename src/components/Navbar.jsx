import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { IMAGES } from '../config/imageConfig';
import SearchOverlay from './SearchOverlay';
import { useStoreConfig } from '../hooks/useStoreConfig';
import './Navbar.css';

const Navbar = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { config } = useStoreConfig();

  const handleLogoClick = (e) => {
    const now = Date.now();
    // Reset if more than 3 seconds have passed since last click
    if (now - lastClickTime > 3000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    setLastClickTime(now);
  };

  useEffect(() => {
    if (clickCount >= 7) {
      setClickCount(0);
      navigate('/admin/login');
    }
  }, [clickCount, navigate]);

  return (
    <nav className="navbar container">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand-link" onClick={handleLogoClick}>
          <img src={IMAGES.logo} alt="ANAYA Logo" className="navbar-logo-img" />
          <div className="navbar-brand-text">
            <div className="logo-title">{config?.name || 'ANAYA'}</div>
            <div className="logo-subtitle">{config?.tagline || 'WEAR THE MOMENT'}</div>
          </div>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/women">Women</Link>
        <Link to="/men">Men</Link>
        <Link to="/occasions">Occasions</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="navbar-actions">
        <button className="icon-button" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Search</span>
        </button>
        <a href={generateWhatsAppLink(null, config)} target="_blank" rel="noopener noreferrer" className="icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
