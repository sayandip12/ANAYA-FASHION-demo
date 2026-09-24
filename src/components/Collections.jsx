import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { IMAGES } from '../config/imageConfig';
import './Collections.css';

const collectionData = [
  { id: 1, title: 'Sarees', image: IMAGES.collectionSaree, link: '/women' },
  { id: 2, title: 'Lehengas', image: IMAGES.collectionLehenga, link: '/women' },
  { id: 3, title: 'Blazers & Suits', image: IMAGES.collectionBlazer, link: '/men' },
  { id: 4, title: 'Panjabi & Kurta', image: IMAGES.collectionPanjabi, link: '/men' },
  { id: 5, title: 'Ethnic Wear', image: IMAGES.collectionEthnic, link: '/women' },
];

const Collections = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  
  // Triplicate the cards to make it loop seamlessly (enough to cover wide screens)
  const cards = [...collectionData, ...collectionData, ...collectionData, ...collectionData];
  
  useEffect(() => {
    if (!trackRef.current) return;
    
    const track = trackRef.current;
    const items = track.children;
    const numItems = items.length;
    
    // Set up very small perspective
    gsap.set(containerRef.current, { perspective: 800 });
    
    let xPos = 0;
    let speed = 0.8; // Slow, premium speed
    let isHovered = false;
    let dragStartX = 0;
    let isDragging = false;
    
    // Track width for infinite looping
    // Assuming 175px width + 28px gap = 203px per card
    const cardWidth = 203;
    const setWidth = cardWidth * collectionData.length; 
    
    const update3D = () => {
      const centerX = window.innerWidth / 2;
      
      for (let i = 0; i < numItems; i++) {
        const item = items[i];
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        
        // Distance from center
        const dist = (itemCenterX - centerX) / (centerX * 1.2);
        const absDist = Math.abs(dist);
        
        // Subtle 3D Transform logic
        const scale = gsap.utils.mapRange(0, 1, 1, 0.95, absDist);
        const opacity = gsap.utils.mapRange(0, 1, 1, 0.7, absDist);
        const rotateY = dist * -5; // Very subtle rotation
        const z = absDist * -30; // Very subtle depth
        const y = absDist * 10; // Slight dip at edges
        
        gsap.set(item, {
          scale: Math.max(0.9, scale),
          opacity: Math.max(0.5, opacity),
          rotationY: rotateY,
          z: z,
          y: y,
          transformOrigin: "center center",
          force3D: true
        });
      }
    };
    
    const tick = () => {
      if (!isHovered && !isDragging) {
        xPos -= speed;
      }
      
      // Infinite loop wrap
      // When we scroll left by an entire set's width, seamlessly jump back
      xPos = gsap.utils.wrap(-setWidth, 0, xPos);
      
      gsap.set(track, { x: xPos });
      update3D();
    };
    
    const ticker = gsap.ticker.add(tick);
    
    // Interaction Handlers
    const onEnter = () => isHovered = true;
    const onLeave = () => {
      isHovered = false;
      isDragging = false;
    };
    
    const onDragStart = (e) => {
      isDragging = true;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      dragStartX = clientX - xPos;
    };
    
    const onDragMove = (e) => {
      if (!isDragging) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      xPos = clientX - dragStartX;
    };
    
    const onDragEnd = () => {
      isDragging = false;
    };
    
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);
    
    track.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    
    track.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('touchend', onDragEnd);
    
    // Initial 3D setup
    update3D();
    
    return () => {
      gsap.ticker.remove(tick);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
      track.removeEventListener('mousedown', onDragStart);
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
      track.removeEventListener('touchstart', onDragStart);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, []);

  return (
    <section className="collections section" ref={containerRef}>
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="collections-header">
          <span className="collections-label">EXPLORE</span>
          <h2 className="collections-title">The Collections</h2>
          <p className="collections-subtitle">A curated edit for every occasion, every story, every you.</p>
        </div>

        <div className="collections-carousel-container" style={{ overflow: 'hidden', padding: '20px 0' }}>
          <div className="collections-track" ref={trackRef}>
            {cards.map((item, index) => (
              <Link to={item.link} key={`${item.id}-${index}`} className="collection-card" draggable="false">
                <div className="collection-image-wrapper">
                  <img src={item.image} alt={item.title} className="collection-image" draggable="false" />
                  <div className="collection-overlay"></div>
                </div>
                <div className="collection-info">
                  <h3 className="collection-name">{item.title}</h3>
                  <span className="collection-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
