import { processTextWithHTML } from '../../utils/textProcessor';
import { useState } from 'react';

// Continue button component for feedback screen
const FeedbackButton = ({ 
  buttonText, 
  nextQuestion, 
  buttonContainerStyle, 
  buttonStyle, 
  buttonTextStyle, 
  arrowStyle 
}) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    // Add exit animation class and delay the action
    setIsExiting(true);
    setTimeout(() => {
      nextQuestion();
    }, 300); // Match the CSS animation duration
  };

  return (
    <div style={buttonContainerStyle}>
      <button
        onClick={handleClick}
        className={`flex items-center cursor-pointer ${
          isExiting ? 'feedback-button-exit' : 'feedback-button-enter'
        }`}
        style={{
          ...buttonStyle,
          gap: 'calc(var(--feedback-button-gap) * 0.7)',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span
          className="text-button"
          style={{
            fontSize: buttonTextStyle.fontSize,
            lineHeight: buttonTextStyle.lineHeight,
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
            transform: 'translateY(-10%)'
          }}
        />
      </button>
    </div>
  );
};

export default FeedbackButton;
