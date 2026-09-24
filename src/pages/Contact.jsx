import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { useStoreConfig } from '../hooks/useStoreConfig';
import './Contact.css';

const Contact = () => {
  const { config } = useStoreConfig();

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
              <p className="contact-text">{config?.address || ''}</p>
            </div>

            <div className="contact-details-box">
              <h3>STORE HOURS</h3>
              <p className="contact-text">{config?.storeHours || ''}</p>
            </div>

            <div className="contact-details-box">
              <h3>CALL US</h3>
              <p className="contact-text">{config?.phone || ''}</p>
            </div>
            
            <div className="contact-services">
              <div className="contact-service-item">PRIVATE VIEWINGS</div>
              <div className="contact-service-item">PERSONAL STYLING</div>
              <div className="contact-service-item">WEDDING CONSULTATION</div>
            </div>

            <div className="contact-actions">
              <a href={`tel:${config?.phone || ''}`} className="contact-btn">
                CALL NOW
              </a>
              <a href={generateWhatsAppLink(null, config)} target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn-solid">
                WHATSAPP
              </a>
            </div>
          </div>
          
          <div className="contact-map-half">
            {config?.address ? (
              <div className="contact-map-container">
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
              <div className="contact-map-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', height: '100%' }}>
                <h3>ANAYA</h3>
                {config?.mapEmbedUrl && (
                  <a href={config.mapEmbedUrl} target="_blank" rel="noopener noreferrer" style={{ marginTop: '1rem', textDecoration: 'none', color: 'var(--color-primary)' }}>
                    View location on Google Maps →
                  </a>
                )}
              </div>
            )}
            {config?.mapEmbedUrl && (
              <a href={config.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="contact-btn" style={{ width: '100%', justifyContent: 'center' }}>
                GET DIRECTIONS
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
