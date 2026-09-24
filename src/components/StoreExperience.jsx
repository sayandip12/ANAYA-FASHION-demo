import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../config/imageConfig';
import { useStoreConfig } from '../hooks/useStoreConfig';
import './StoreExperience.css';

const StoreExperience = () => {
  const { config } = useStoreConfig();

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
            {config?.name || 'ANAYA'}
          </h2>
          
          <div className="store-address-box">
            <p className="store-address-text">{config?.address || ''}</p>
            <p className="store-phone-text">Call: {config?.phone || ''}</p>
          </div>
          
          <div className="store-services">
            <div className="store-service-item">PRIVATE VIEWINGS</div>
            <div className="store-service-item">PERSONAL STYLING</div>
            <div className="store-service-item">WEDDING CONSULTATION</div>
          </div>
          
          <Link to="/contact" className="store-button">
            VISIT OUR STORE
            <span className="button-arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoreExperience;
