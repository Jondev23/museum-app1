// Import React hooks for animation control
import { useState, useEffect } from 'react';

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
  const [animationClass, setAnimationClass] = useState('');

  // Handle visibility changes with animations
  useEffect(() => {
    if (isVisible && !shouldRender) {
      // Show with entrance animation
      setShouldRender(true);
      setAnimationClass('screen-transition enter-language');
    } else if (!isVisible && shouldRender) {
      // Hide with exit animation
      setAnimationClass('screen-transition exit-language');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        setShouldRender(false);
        setAnimationClass('');
      }, 900); // Match animation duration
    }
  }, [isVisible, shouldRender]);

  // Don't render if not visible or no content data
  if (!shouldRender || !contentData) return null;

  return (
    <div className={animationClass}>
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
