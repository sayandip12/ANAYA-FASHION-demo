import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import WomenSection from '../components/WomenSection';
import MenSection from '../components/MenSection';
import StoreExperience from '../components/StoreExperience';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    // Basic GSAP interactions
    const ctx = gsap.context(() => {
      // Collections Image Parallax/Reveal (example)
      gsap.utils.toArray('.feature-section').forEach((section) => {
        const img = section.querySelector('.feature-image');
        if (img) {
          gsap.fromTo(img, 
            { scale: 1.1 },
            {
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
        }
      });
      
      // Store section reveal
      gsap.fromTo('.store-text-container > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.store-section',
            start: "top 70%",
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="home-page">
      <Hero />
      <Collections />
      <WomenSection />
      <MenSection />
      <StoreExperience />
      <Footer />
    </div>
  );
};

export default Home;
