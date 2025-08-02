// Import React hooks for animation control
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Import language selector logic and components
import useLanguageSelector from '../hooks/useLanguageSelector';

// Import subcomponents
import LanguageIcon from './LanguageSelector/LanguageIcon';
import LanguageTitle from './LanguageSelector/LanguageTitle';
import LanguageButtons from './LanguageSelector/LanguageButtons';
import LanguageOverlay from './LanguageSelector/LanguageOverlay';
import LanguageContainer from './LanguageSelector/LanguageContainer';

// Language selector overlay component - allows users to switch between German and English
const LanguageSelector = () => {
  const {
    isVisible,
    contentData,
    handleLanguageChange,
    handleOverlayClick,
    handleContentClick,
    getButtonState
  } = useLanguageSelector();

  // State for managing animations
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef(null);

  // Handle visibility changes with GSAP animations
  useEffect(() => {
    if (isVisible && !shouldRender) {
      // Show with entrance animation
      setShouldRender(true);
      
      // Wait for next frame to ensure element is in DOM
      requestAnimationFrame(() => {
        if (containerRef.current) {
          // Set initial state
          gsap.set(containerRef.current, {
            opacity: 0,
            scale: 0.95,
            transformOrigin: "center center"
          });
          
          // Animate in
          gsap.to(containerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out"
          });
        }
      });
    } else if (!isVisible && shouldRender) {
      // Hide with exit animation
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          ease: "power2.in",
          onComplete: () => {
            setShouldRender(false);
          }
        });
      }
    }
  }, [isVisible, shouldRender]);

  // Don't render if not visible or no content data
  if (!shouldRender || !contentData) return null;

  return (
    <div ref={containerRef}>
      <LanguageOverlay onOverlayClick={handleOverlayClick}>
        <LanguageContainer onContentClick={handleContentClick}>
          <LanguageIcon />

          <LanguageTitle
            englishTitle={contentData.englishTitle}
            germanTitle={contentData.germanTitle}
          />

          <LanguageButtons
            germanButtonText={contentData.germanButtonText}
            englishButtonText={contentData.englishButtonText}
            getButtonState={getButtonState}
            handleLanguageChange={handleLanguageChange}
          />
        </LanguageContainer>
      </LanguageOverlay>
    </div>
  );
};

export default LanguageSelector;
