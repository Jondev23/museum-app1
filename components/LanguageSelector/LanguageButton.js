import { processTextWithHTML } from '../../utils/textProcessor';

// Individual language button component
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
    <button
      onClick={() => onLanguageChange(language)}
      onTouchStart={handleTouchStart}
      className={buttonClass}
      style={{
        touchAction: 'manipulation',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <span className="text-button language-button-text">
        {processTextWithHTML(buttonText)}
      </span>
    </button>
  );
};

export default LanguageButton;
