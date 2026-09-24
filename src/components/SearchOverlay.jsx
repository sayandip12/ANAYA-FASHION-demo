import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import './SearchOverlay.css';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Load all products to search locally for instant results
      const loadData = async () => {
        try {
          const data = await productService.getProducts();
          setAllProducts(data);
        } catch (e) {
          console.error("Failed to load products for search", e);
        }
      };
      loadData();
      
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const matches = allProducts.filter(p => {
      return (
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.gender && p.gender.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (Array.isArray(p.occasions) ? p.occasions.some(occ => occ.toLowerCase().includes(q)) : (typeof p.occasions === 'string' && p.occasions.toLowerCase().includes(q)))
      );
    });
    setResults(matches);
  }, [query, allProducts]);

  const handleResultClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-overlay-backdrop" onClick={onClose}></div>
      <div className="search-overlay-content">
        <div className="search-header">
          <h2 className="search-title">SEARCH ANAYA</h2>
          <button className="search-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="search-input-container">
          <input 
            type="text" 
            ref={inputRef}
            className="search-input" 
            placeholder="Search products, categories or occasions..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="search-results-container">
          {query.trim() && results.length > 0 && (
            <div className="search-results-grid">
              {results.map(product => (
                <div key={product.id} className="search-result-card" onClick={() => handleResultClick(product.id)}>
                  <div className="search-result-image-wrapper">
                    <img src={product.image} alt={product.name} className="search-result-image" />
                  </div>
                  <div className="search-result-info">
                    <h4 className="search-result-name">{product.name}</h4>
                    <p className="search-result-meta">{product.category}</p>
                    <p className="search-result-price">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="search-empty">
              <p className="search-empty-text">No pieces found for "{query}".</p>
              <div className="search-empty-actions">
                <button onClick={() => { onClose(); navigate('/women'); }} className="search-empty-link">EXPLORE WOMEN</button>
                <button onClick={() => { onClose(); navigate('/men'); }} className="search-empty-link">EXPLORE MEN</button>
                <button onClick={() => { onClose(); navigate('/occasions'); }} className="search-empty-link">EXPLORE OCCASIONS</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
