import { AnimatePresence } from 'framer-motion';
import useLanguageSelector from '../hooks/useLanguageSelector';
import LanguageIcon from './LanguageSelector/LanguageIcon';
import LanguageTitle from './LanguageSelector/LanguageTitle';
import LanguageButtons from './LanguageSelector/LanguageButtons';
import LanguageOverlay from './LanguageSelector/LanguageOverlay';
import LanguageContainer from './LanguageSelector/LanguageContainer';

const LanguageSelector = () => {
  const {
    isVisible,
    contentData,
    handleLanguageChange,
    handleOverlayClick,
    handleContentClick,
    getButtonState
  } = useLanguageSelector();

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
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
      )}
    </AnimatePresence>
  );
};

export default LanguageSelector;
