// Import animation library and button component
import { motion, getLanguageSelectorTransition } from '../../utils/screenTransitions';
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
    // Animated container for language buttons
    <motion.div
      {...getLanguageSelectorTransition('buttons')}
      className="language-buttons-container"
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
    </motion.div>
  );
};

export default LanguageButtons;
