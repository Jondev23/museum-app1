import { motion } from 'framer-motion';
import LanguageButton from './LanguageButton';
import { ANIMATION_CONFIG } from './LanguageSelectorConfig';

const LanguageButtons = ({ 
  germanButtonText, 
  englishButtonText, 
  getButtonState, 
  handleLanguageChange 
}) => {
  const germanState = getButtonState('de');
  const englishState = getButtonState('en');

  return (
    <motion.div
      initial={ANIMATION_CONFIG.BUTTONS.INITIAL}
      animate={ANIMATION_CONFIG.BUTTONS.ANIMATE}
      transition={ANIMATION_CONFIG.BUTTONS.TRANSITION}
      className="language-buttons-container"
    >
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
