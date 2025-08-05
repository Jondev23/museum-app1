import { processTextWithHTML } from '../../utils/textProcessor';

// Global arrow button component - can be used throughout the application
const ArrowButton = ({ 
  buttonText, 
  onClick, 
  buttonContainerStyle = {}, 
  buttonStyle = {}, 
  buttonTextStyle = {}, 
  arrowStyle = {},
  arrowIcon = "./images/GUI-2.svg",
  arrowAlt = "Arrow",
  className = "",
  disabled = false,
  gap = '1.5rem',
  position = 'bottom-right', 
  zIndex = 50
}) => {
  // Define position presets
  const positionStyles = {
    'bottom-right': {
      position: 'fixed',
      bottom: '2.52rem', 
      right: '10rem',
      zIndex: zIndex
    },
    'bottom-left': {
      position: 'fixed',
      bottom: 'min(4.375rem, 7vh)',
      left: 'min(9.5rem, 14.5vw)',
      zIndex: zIndex
    },
    'bottom-center': {
      position: 'fixed',
      bottom: 'min(4.375rem, 7vh)',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: zIndex
    },
    'custom': {
      zIndex: zIndex
    },
    'inline': {
      position: 'relative'
    }
  };

  const defaultButtonStyle = {
    gap: gap,
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer'
  };

  const defaultArrowStyle = {
    touchAction: 'manipulation',
    pointerEvents: 'none',
    transform: 'translateY(-0.2rem)',
    ...arrowStyle
  };

  // Combine position styles with container styles
  const finalContainerStyle = {
    ...positionStyles[position],
    ...buttonContainerStyle
  };

  return (
    <div style={finalContainerStyle}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled && onClick) {
            onClick(e);
          }
        }}
        className={`flex items-center ${className}`}
        style={{
          ...defaultButtonStyle,
          ...buttonStyle
        }}
        disabled={disabled}
      >
        <span
          className="text-button"
          style={{
            textTransform: buttonTextStyle.textTransform,
            ...buttonTextStyle
          }}
        >
          {processTextWithHTML(buttonText)}
        </span>
        <img
          src={arrowIcon}
          alt={arrowAlt}
          style={defaultArrowStyle}
        />
      </button>
    </div>
  );
};

export default ArrowButton;
