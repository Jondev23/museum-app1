// Import animation library and language selector components
import { AnimatePresence } from 'framer-motion';
import useLanguageSelector from '../hooks/useLanguageSelector';

// Import subcomponents
import LanguageIcon from './LanguageSelector/LanguageIcon';
import LanguageTitle from './LanguageSelector/LanguageTitle';
import LanguageButtons from './LanguageSelector/LanguageButtons';
import LanguageOverlay from './LanguageSelector/LanguageOverlay';
import LanguageContainer from './LanguageSelector/LanguageContainer';

// Language selector overlay component - allows users to switch between German and English
const LanguageSelector = () => {
  // Get language selector state and handlers from custom hook
  const {
    isVisible,
    contentData,
    handleLanguageChange,
    handleOverlayClick,
    handleContentClick,
    getButtonState
  } = useLanguageSelector();

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    // Animated overlay that appears when language selector is triggered
    <AnimatePresence>
      {isVisible && (
        <LanguageOverlay onOverlayClick={handleOverlayClick}>
          <LanguageContainer onContentClick={handleContentClick}>
            {/* Globe icon */}
            <LanguageIcon />
            
            {/* Title text in both languages */}
            <LanguageTitle
              englishTitle={contentData.englishTitle}
              germanTitle={contentData.germanTitle}
            />

            {/* Language selection buttons */}
            <LanguageButtons
              germanButtonText={contentData.germanButtonText}
              englishButtonText={contentData.englishButtonText}
              getButtonState={getButtonState}
              handleLanguageChange={handleLanguageChange}
            />
          </LanguageContainer>
        </LanguageOverlay>
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
