import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productService } from '../services/productService';
import './CollectionsPage.css';

const CollectionsPage = ({ genderFilter }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [genderFilter]);

  const displayProducts = genderFilter 
    ? products.filter(p => p.gender.toLowerCase() === genderFilter.toLowerCase())
    : products;

  const pageTitle = genderFilter ? `${genderFilter.toUpperCase()} COLLECTION` : 'ALL COLLECTIONS';

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-spacer" style={{ height: '100px' }}></div>
      
      <div className="catalogue-container container">
        <div className="catalogue-header">
          <h1 className="catalogue-title">{pageTitle}</h1>
          <p className="catalogue-subtitle">A curated selection from ANAYA.</p>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
        ) : (
          <div className="catalogue-grid">
            {displayProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <span className="product-category">{product.category}</span>
                  <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                  <div className="product-view-link">VIEW PIECE →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CollectionsPage;
