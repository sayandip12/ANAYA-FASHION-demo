import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../config/imageConfig';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const WomenSection = () => {
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
    <section className="feature-section feature-women" ref={sectionRef}>
      <Link to="/women" className="feature-link-wrapper">
        <div className="feature-content-half">
          <div className="feature-text-container" ref={textRef}>
            <div className="feature-label">
              <span className="label-line"></span>
              FOR HER
            </div>
            
            <h2 className="feature-title">
              Made for Your<br />
              Grand Day
            </h2>
            
            <p className="feature-description">
              From timeless sarees to regal lehengas, discover pieces created for every important moment.
            </p>
            
            <div className="feature-button">
              EXPLORE WOMEN
              <span className="button-arrow">→</span>
            </div>
          </div>
        </div>
        
        <div className="feature-image-half">
          <div className="feature-image-wrapper">
            <img src={IMAGES.womenFeature} alt="Women's Collection" className="feature-image" ref={imageRef} />
          </div>
          <div className="feature-side-caption">
            ELEGANCE<br />
            IN EVERY<br />
            THREAD
          </div>
        </div>
      </Link>
    </section>
  );
};

export default WomenSection;
