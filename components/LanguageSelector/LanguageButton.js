// Import text processing utility
import { processTextWithHTML } from '../../utils/textProcessor';

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
    // Button with CSS-based animations for interactions
    <button
      onClick={() => onLanguageChange(language)}
      onTouchStart={handleTouchStart}
      className={`${buttonClass} hover:scale-[0.98] active:scale-[0.95] transition-transform duration-100`}
      style={{
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {/* Button text content */}
      <span className="text-button language-button-text">
        {processTextWithHTML(buttonText)}
      </span>
    </button>
  );
};

export default LanguageButton;
