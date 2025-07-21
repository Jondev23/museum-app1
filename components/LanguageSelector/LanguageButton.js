import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './LanguageSelectorConfig';

const LanguageButton = ({ 
  language, 
  buttonText, 
  isActive, 
  borderColor, 
  backgroundColor, 
  onLanguageChange 
}) => {
  const buttonClass = isActive 
    ? "language-button language-button-active transition-all"
    : "language-button language-button-inactive transition-all";

  const handleTouchStart = (e) => {
    e.preventDefault();
    onLanguageChange(language);
  };

  return (
    <motion.button
      onClick={() => onLanguageChange(language)}
      onTouchStart={handleTouchStart}
      whileHover={ANIMATION_CONFIG.BUTTON_HOVER}
      whileTap={ANIMATION_CONFIG.BUTTON_TAP}
      className={buttonClass}
      style={{
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <span className="text-button language-button-text">
        {buttonText}
      </span>
    </motion.button>
  );
};

export default LanguageButton;
