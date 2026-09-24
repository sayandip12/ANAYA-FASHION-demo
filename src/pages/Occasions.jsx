import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [activeOccasion, setActiveOccasion] = useState('Wedding');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const allProducts = await productService.getProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    if (!product.occasions || !Array.isArray(product.occasions)) return false;
    return product.occasions.includes(activeOccasion);
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
            {OCCASION_CATEGORIES.map(category => (
              <button
                key={category}
                className={`occasion-tab ${activeOccasion === category ? 'active' : ''}`}
                onClick={() => setActiveOccasion(category)}
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
            <div className="occasions-loading">Loading curations...</div>
          ) : (
            <div className="occasions-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <Link to={`/product/${product.id}`} key={product.id} className="occasion-product-card">
                    <div className="occasion-product-image-container">
                      <img src={product.image} alt={product.name} className="occasion-product-image" />
                    </div>
                    <div className="occasion-product-info">
                      <h3 className="occasion-product-name">{product.name}</h3>
                      <p className="occasion-product-details">
                        {product.category} • {product.gender}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-products-message">
                  No curations available for {activeOccasion} currently.
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
