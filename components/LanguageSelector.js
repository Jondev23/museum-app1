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
      // Show with simple fade-in animation
      setShouldRender(true);
      
      // Wait a small delay to ensure element is in DOM and avoid GSAP conflicts
      setTimeout(() => {
        if (containerRef.current) {
          // No need to set initial state since CSS handles it
          // Simple fade in
          gsap.to(containerRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }, 50); // 50ms delay to avoid interference with main timeline
    } else if (!isVisible && shouldRender) {
      // Hide with simple fade-out animation
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
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
    <div ref={containerRef} className="language-selector-container">
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
