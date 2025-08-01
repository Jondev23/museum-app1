import LanguageButton from './LanguageButton';

// Container for both German and English language buttons
const LanguageButtons = ({ 
  germanButtonText, 
  englishButtonText, 
  getButtonState, 
  handleLanguageChange 
}) => {
  const germanState = getButtonState('de');
  const englishState = getButtonState('en');

  return (
    <div className="language-buttons-container">
      {/* German language button */}
      <LanguageButton
        language="de"
        buttonText={germanButtonText}
        isActive={germanState.isActive}
        onLanguageChange={handleLanguageChange}
      />

      {/* English language button */}
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
