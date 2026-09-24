import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/businessConfig';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-content-half">
            <div className="contact-label">
              <span className="label-line"></span>
              CONTACT ANAYA
            </div>
            
            <h1 className="contact-title">Get in Touch</h1>
            
            <div className="contact-details-box">
              <h3>VISIT OUR STORE</h3>
              <p className="contact-text">{BUSINESS_CONFIG.address}</p>
            </div>

            <div className="contact-details-box">
              <h3>STORE HOURS</h3>
              <p className="contact-text">{BUSINESS_CONFIG.storeHours}</p>
            </div>

            <div className="contact-details-box">
              <h3>CALL US</h3>
              <p className="contact-text">{BUSINESS_CONFIG.phone}</p>
            </div>
            
            <div className="contact-services">
              <div className="contact-service-item">PRIVATE VIEWINGS</div>
              <div className="contact-service-item">PERSONAL STYLING</div>
              <div className="contact-service-item">WEDDING CONSULTATION</div>
            </div>

            <div className="contact-actions">
              <a href={`tel:${BUSINESS_CONFIG.phone}`} className="contact-btn">
                CALL NOW
              </a>
              <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn-solid">
                WHATSAPP
              </a>
            </div>
          </div>
          
          <div className="contact-map-half">
            {BUSINESS_CONFIG.mapEmbedUrl && (
              <div className="contact-map-container">
                <iframe 
                  src={BUSINESS_CONFIG.mapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ANAYA Store Location"
                ></iframe>
              </div>
            )}
            <a href={BUSINESS_CONFIG.mapLink} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{ width: '100%', justifyContent: 'center' }}>
              GET DIRECTIONS
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
