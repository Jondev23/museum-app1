import { motion } from 'framer-motion';
import LanguageButton from './LanguageButton';
import { ANIMATION_CONFIG, STYLE_CONFIG } from './LanguageSelectorConfig';

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
      style={STYLE_CONFIG.BUTTONS_CONTAINER}
    >
      <div style={STYLE_CONFIG.BUTTONS_CONTAINER}>
        <LanguageButton
          language="de"
          buttonText={germanButtonText}
          isActive={germanState.isActive}
          borderColor={germanState.borderColor}
          backgroundColor={germanState.backgroundColor}
          onLanguageChange={handleLanguageChange}
        />

        <LanguageButton
          language="en"
          buttonText={englishButtonText}
          isActive={englishState.isActive}
          borderColor={englishState.borderColor}
          backgroundColor={englishState.backgroundColor}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    </motion.div>
  );
};

export default LanguageButtons;
