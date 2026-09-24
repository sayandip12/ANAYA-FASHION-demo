import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { productService } from '../services/productService';
import './Collections.css';

const Collections = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const wasDraggedRef = useRef(false);
  const [collectionData, setCollectionData] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const allProducts = await productService.getProducts();
        const targets = [
          { match: p => p.category.toLowerCase().includes('saree'), name: 'Sarees', occasion: 'Wedding' },
          { match: p => p.category.toLowerCase().includes('lehenga'), name: 'Lehengas', occasion: 'Bridal' },
          { match: p => p.category.toLowerCase().includes('blazer') || p.category.toLowerCase().includes('suit'), name: 'Blazers & Suits', occasion: 'Formal' },
          { match: p => p.category.toLowerCase().includes('panjabi') || p.category.toLowerCase().includes('kurta'), name: 'Panjabi & Kurta', occasion: 'Traditional' },
          { match: p => p.category.toLowerCase().includes('ethnic wear'), name: 'Ethnic Wear', occasion: 'Festive' }
        ];

        const newCollectionData = [];
        
        targets.forEach(t => {
          const product = allProducts.find(t.match);
          if (product && !newCollectionData.find(c => c.title === t.name)) {
            // Pick an occasion: prefer the mapped one if the product has it, else use the first one from product, else fallback
            const actualOccasion = (product.occasions && product.occasions.includes(t.occasion)) 
              ? t.occasion 
              : (product.occasions && product.occasions.length > 0 ? product.occasions[0] : t.occasion);
            
            newCollectionData.push({
              id: product.id,
              title: t.name,
              image: product.image,
              link: `/occasions?occasion=${encodeURIComponent(actualOccasion)}`
            });
          }
        });

        // If we don't have enough, fill with featured or other products
        if (newCollectionData.length < 5) {
          const additional = allProducts.filter(p => !newCollectionData.find(c => c.id === p.id));
          for (const p of additional) {
            if (newCollectionData.length >= 5) break;
            const fallbackOccasion = p.occasions && p.occasions.length > 0 ? p.occasions[0] : 'Party';
            newCollectionData.push({
              id: p.id,
              title: p.category,
              image: p.image,
              link: `/occasions?occasion=${encodeURIComponent(fallbackOccasion)}`
            });
          }
        }
        
        setCollectionData(newCollectionData);
      } catch (error) {
        console.error("Failed to load collections", error);
      }
    };
    loadData();
  }, []);
  
  // Triplicate the cards to make it loop seamlessly (enough to cover wide screens)
  const cards = collectionData.length > 0 ? [...collectionData, ...collectionData, ...collectionData, ...collectionData] : [];
  
  useEffect(() => {
    if (cards.length === 0 || !trackRef.current) return;
    
    const track = trackRef.current;
    const items = track.children;
    const numItems = items.length;
    
    // Set up very small perspective
    gsap.set(containerRef.current, { perspective: 800 });
    
    let xPos = 0;
    let speed = 0.8; // Slow, premium speed
    let isHovered = false;
    let dragStartX = 0;
    let initialClientX = 0;
    let isDragging = false;
    
    // Track width for infinite looping
    // Assuming 175px width + 28px gap = 203px per card
    const cardWidth = 203;
    const setWidth = cardWidth * collectionData.length; 
    
    const update3D = () => {
      const centerX = window.innerWidth / 2;
      
      for (let i = 0; i < numItems; i++) {
        const item = items[i];
        if (!item) continue;
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
      wasDraggedRef.current = false;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      initialClientX = clientX;
      dragStartX = clientX - xPos;
    };
    
    const onDragMove = (e) => {
      if (!isDragging) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      if (Math.abs(clientX - initialClientX) > 5) {
        wasDraggedRef.current = true;
      }
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
  }, [cards.length, collectionData.length]);

  if (collectionData.length === 0) {
    return <section className="collections section" style={{ minHeight: '300px' }}></section>;
  }

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
              <Link 
                to={item.link} 
                key={`${item.id}-${index}`} 
                className="collection-card" 
                draggable="false"
                onClick={(e) => {
                  if (wasDraggedRef.current) {
                    e.preventDefault();
                  }
                }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
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
