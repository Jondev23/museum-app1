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

  if (!isVisible) return null;

  return (
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
  );
};

export default LanguageSelector;
