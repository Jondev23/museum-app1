import { motion } from 'framer-motion';
import { ANIMATION_CONFIG, STYLE_CONFIG } from './LanguageSelectorConfig';

const LanguageButton = ({ 
  language, 
  buttonText, 
  isActive, 
  borderColor, 
  backgroundColor, 
  onLanguageChange 
}) => {
  const buttonStyle = {
    ...STYLE_CONFIG.BUTTON,
    borderColor,
    background: backgroundColor
  };

  return (
    <motion.button
      onClick={() => onLanguageChange(language)}
      whileHover={ANIMATION_CONFIG.BUTTON_HOVER}
      whileTap={ANIMATION_CONFIG.BUTTON_TAP}
      className="transition-all"
      style={buttonStyle}
    >
      <span 
        className="text-button"
        style={STYLE_CONFIG.BUTTON_TEXT}
      >
        {buttonText}
      </span>
    </motion.button>
  );
};

export default LanguageButton;
