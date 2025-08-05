import { processTextWithHTML } from '../../utils/textProcessor';

// Continue button component for feedback screen
const FeedbackButton = ({ 
  buttonText, 
  nextQuestion, 
  buttonContainerStyle, 
  buttonStyle, 
  buttonTextStyle, 
  arrowStyle 
}) => {
  return (
    <div
      style={buttonContainerStyle}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextQuestion(); 
        }}
        className="flex items-center cursor-pointer"
        style={{
          ...buttonStyle,
          gap: '1.5rem',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span
          className="text-button"
          style={{
            textTransform: buttonTextStyle.textTransform
          }}
        >
          {processTextWithHTML(buttonText)}
        </span>
        <img
          src="./images/GUI-2.svg"
          alt="Zur Auswertung"
          style={{
            ...arrowStyle,
            touchAction: 'manipulation',
            pointerEvents: 'none',
            transform: 'translateY(-0.2rem)'
          }}
        />
      </button>
    </div>
  );
};

export default FeedbackButton;
