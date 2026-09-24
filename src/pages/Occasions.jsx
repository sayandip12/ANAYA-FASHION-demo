import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productService } from '../services/productService';
import './Occasions.css';

const OCCASION_CATEGORIES = [
  'Wedding',
  'Bridal',
  'Reception',
  'Festive',
  'Party',
  'Engagement',
  'Traditional',
  'Formal'
];

const Occasions = () => {
  const [products, setProducts] = useState([]);
  const [activeOccasion, setActiveOccasion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const queryParams = new URLSearchParams(location.search);
  const urlOccasion = queryParams.get('occasion');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const allProducts = await productService.getProducts();
      setProducts(allProducts);
    } catch (err) {
      console.error("Failed to load products", err);
      setError("Unable to load the collection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const availableOccasions = OCCASION_CATEGORIES.filter(category => 
    products.some(product => Array.isArray(product.occasions) && product.occasions.some(occ => occ.toLowerCase() === category.toLowerCase()))
  );

  useEffect(() => {
    if (urlOccasion && OCCASION_CATEGORIES.some(c => c.toLowerCase() === urlOccasion.toLowerCase())) {
      const match = OCCASION_CATEGORIES.find(c => c.toLowerCase() === urlOccasion.toLowerCase());
      if (activeOccasion !== match) {
        setActiveOccasion(match);
      }
    } else if (!urlOccasion && !activeOccasion && availableOccasions.length > 0) {
      setActiveOccasion(availableOccasions[0]);
      navigate(`/occasions?occasion=${encodeURIComponent(availableOccasions[0])}`, { replace: true });
    }
  }, [urlOccasion, availableOccasions, activeOccasion, navigate]);

  const handleOccasionClick = (category) => {
    setActiveOccasion(category);
    navigate(`/occasions?occasion=${encodeURIComponent(category)}`);
  };

  const filteredProducts = products.filter(product => {
    if (!activeOccasion || !product.occasions || !Array.isArray(product.occasions)) return false;
    return product.occasions.some(occ => occ.toLowerCase() === activeOccasion.toLowerCase());
  });

  return (
    <>
      <Navbar />
      <div className="occasions-page">
        <header className="occasions-header">
          <h1 className="occasions-title">OCCASIONS</h1>
          <p className="occasions-subtitle">Dress for every moment.</p>
        </header>

        <section className="occasions-navigation-section">
          <div className="occasions-tabs">
            {availableOccasions.map(category => (
              <button
                key={category}
                className={`occasion-tab ${activeOccasion === category ? 'active' : ''}`}
                onClick={() => handleOccasionClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="occasions-content">
          <div className="occasions-content-header">
            <h2 className="active-occasion-title">{activeOccasion}</h2>
            <div className="active-occasion-line"></div>
          </div>
          
          {isLoading ? (
            <div className="occasions-loading">Loading the collection...</div>
          ) : error ? (
            <div className="occasions-error" style={{ textAlign: 'center', padding: '100px 20px' }}>
              <h2>{error}</h2>
              <button className="btn-primary" onClick={loadProducts} style={{ marginTop: '20px' }}>Retry</button>
            </div>
          ) : products.length === 0 ? (
            <div className="occasions-empty" style={{ textAlign: 'center', padding: '100px 20px' }}>
              <h2>NO PIECES AVAILABLE</h2>
              <p>No products are currently available.</p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <Link to="/women" className="btn-primary">Women</Link>
                <Link to="/men" className="btn-secondary">Men</Link>
                <Link to="/" className="btn-secondary">Home</Link>
              </div>
            </div>
          ) : (
            <div className="occasions-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <Link to={`/product/${product.id}`} key={product.id} className="occasion-product-card">
                    <div className="occasion-product-image-container">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="occasion-product-image" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div className="occasion-product-info">
                      <h3 className="occasion-product-name">{product.name}</h3>
                      <p className="occasion-product-details">
                        {product.category} • {product.gender}
                      </p>
                      <p className="occasion-product-price">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-products-message" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '60px 0' }}>
                  <h2>NO PIECES AVAILABLE</h2>
                  <p>No products are currently available for this selection.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Occasions;
