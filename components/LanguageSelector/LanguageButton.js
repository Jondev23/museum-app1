// Import animation library and configuration
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './LanguageSelectorConfig';

// Individual language button component for German/English selection
const LanguageButton = ({ 
  language, 
  buttonText, 
  isActive, 
  borderColor, 
  backgroundColor, 
  onLanguageChange 
}) => {
  // Dynamic CSS classes based on active state
  const buttonClass = isActive 
    ? "language-button language-button-active transition-all"
    : "language-button language-button-inactive transition-all";

  // Handle touch events for mobile devices
  const handleTouchStart = (e) => {
    e.preventDefault();
    onLanguageChange(language);
  };

  return (
    // Animated button with hover and tap interactions
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
      {/* Button text content */}
      <span className="text-button language-button-text">
        {buttonText}
      </span>
    </motion.button>
  );
};

export default LanguageButton;
