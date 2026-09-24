import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../config/imageConfig';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import './StoreExperience.css';

const StoreExperience = () => {
  return (
    <section className="store-section" id="store-section">
      <div className="store-image-half">
        <img src={IMAGES.store} alt="ANAYA Boutique Interior" className="store-image" />
      </div>
      
      <div className="store-content-half">
        <div className="store-text-container">
          <div className="store-label">
            <span className="label-line"></span>
            OUR BOUTIQUE
          </div>
          
          <h2 className="store-title">
            Experience<br />
            ANAYA
          </h2>
          
          <div className="store-address-box">
            <p className="store-address-text">{BUSINESS_CONFIG.address}</p>
            <p className="store-phone-text">Call: {BUSINESS_CONFIG.phone}</p>
          </div>
          
          <div className="store-services">
            <div className="store-service-item">PRIVATE VIEWINGS</div>
            <div className="store-service-item">PERSONAL STYLING</div>
            <div className="store-service-item">WEDDING CONSULTATION</div>
          </div>
          
          <Link to="/contact" className="store-button" style={{ marginBottom: '24px', display: 'inline-flex' }}>
            VISIT OUR STORE
            <span className="button-arrow">→</span>
          </Link>

          {BUSINESS_CONFIG.mapEmbedUrl && (
            <div className="store-map-container">
              <iframe 
                src={BUSINESS_CONFIG.mapEmbedUrl} 
                width="100%" 
                height="120" 
                style={{ border: 0, borderRadius: '4px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="ANAYA Store Location"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StoreExperience;
