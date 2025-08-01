// Import button component
import LanguageButton from './LanguageButton';

// Container for both German and English language buttons
const LanguageButtons = ({ 
  germanButtonText, 
  englishButtonText, 
  getButtonState, 
  handleLanguageChange 
}) => {
  // Get button states for each language
  const germanState = getButtonState('de');
  const englishState = getButtonState('en');

  return (
    // Container for language buttons with CSS animations
    <div
      className="language-buttons-container fade-animation"
    >
      {/* German language button */}
      <LanguageButton
        language="de"
        buttonText={germanButtonText}
        isActive={germanState.isActive}
        onLanguageChange={handleLanguageChange}
      />

      <LanguageButton
        language="en"
        buttonText={englishButtonText}
        isActive={englishState.isActive}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};

export default LanguageButtons;
