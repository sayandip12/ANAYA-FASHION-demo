import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../config/imageConfig';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const MenSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    // Parallax on image and scale down
    gsap.fromTo(image, 
      { yPercent: -5, scale: 1.02 },
      {
        yPercent: 5,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section className="feature-section feature-men" ref={sectionRef}>
      <Link to="/men" className="feature-link-wrapper feature-reverse">
        
        <div className="feature-content-half">
          <div className="feature-text-container" ref={textRef}>
            <div className="feature-label">
              <span className="label-line"></span>
              FOR HIM
            </div>
            
            <h2 className="feature-title">
              Heritage,<br />
              Reimagined
            </h2>
            
            <p className="feature-description">
              From classic blazers to regal sherwanis, explore a collection that blends tradition with contemporary style.
            </p>
            
            <div className="feature-button">
              EXPLORE MEN
              <span className="button-arrow">→</span>
            </div>
          </div>
        </div>

        <div className="feature-image-half">
          <div className="feature-image-wrapper">
            <img src={IMAGES.menFeature} alt="Men's Collection" className="feature-image" ref={imageRef} />
          </div>
          <div className="feature-side-caption side-caption-left">
            ROOTED<br />
            IN TRADITION<br />
            STYLED FOR<br />
            TOMORROW
          </div>
        </div>
        
      </Link>
    </section>
  );
};

export default MenSection;
