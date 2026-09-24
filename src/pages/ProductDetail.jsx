import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { productService } from '../services/productService';
import { generateWhatsAppLink } from '../utils/whatsapp';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div style={{ padding: '200px 0', textAlign: 'center' }}>Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <div style={{ padding: '200px 0', textAlign: 'center' }}>
          <h2>Piece Not Found</h2>
          <Link to="/" style={{ color: 'var(--accent-color)' }}>Return to Catalogue</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="page-spacer" style={{ height: '100px' }}></div>
      
      <div className="product-detail-container container">
        <div className="product-detail-image-side">
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        
        <div className="product-detail-info-side">
          <div className="product-detail-breadcrumbs">
            <Link to="/">HOME</Link> / <Link to={`/${product.gender.toLowerCase()}`}>{product.gender.toUpperCase()}</Link> / <span>{product.category.toUpperCase()}</span>
          </div>
          
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="product-detail-price">₹{Number(product.price).toLocaleString('en-IN')}</div>
          
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-specs">
            <div className="spec-row">
              <span className="spec-label">Fabric:</span>
              <span className="spec-value">{product.fabric}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Sizes:</span>
              <span className="spec-value">{Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Availability:</span>
              <span className="spec-value">{product.availability}</span>
            </div>
          </div>
          
          <div className="product-actions">
            <a href={generateWhatsAppLink(product)} target="_blank" rel="noopener noreferrer" className="btn-primary">
              ENQUIRE ON WHATSAPP
            </a>
            <button className="btn-secondary">
              BOOK PRIVATE VIEWING
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
