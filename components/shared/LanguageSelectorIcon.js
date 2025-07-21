import { motion } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const LanguageSelectorIcon = ({ 
  variant = 'standard',
  className = '',
  style = {},
  delay = 0.6,
  opacity = 0.8
}) => {
  const { setShowLanguageSelector } = useApp();
  const [isPressed, setIsPressed] = useState(false);
  const [touchStarted, setTouchStarted] = useState(false);

  // Consistent base styles for all variants
  const baseIconStyles = {
    width: 'min(2.7rem, 4.86vw, 6.075vh)', 
    height: 'min(2.7rem, 4.86vw, 6.075vh)',
    display: 'block',
    opacity: opacity
  };

  // Standard position - rely on CSS classes for consistent positioning
  const getContainerStyles = () => {
    const baseStyles = {
      // Let CSS handle positioning via class
      position: 'relative',
      zIndex: 75,
    };

    return {
      ...baseStyles,
      ...style
    };
  };

  // Standard button styles based on FeedbackScreen
  const getButtonStyles = () => {
    return {
      minWidth: 'min(3.5rem, 6vw)',
      minHeight: 'min(3.5rem, 6vh)'
    };
  };

  // Standard animation - uses FeedbackScreen animation
  const getInitialAnimation = () => {
    return { y: '100%', opacity: 0 };
  };

  const handleClick = (e) => {
    // Only handle click if it wasn't initiated by touch
    if (!touchStarted) {
      e.stopPropagation();
      console.log('Globe icon clicked (click event), opening language selector');
      setShowLanguageSelector(true);
    }
    // Reset touch flag after a short delay
    setTimeout(() => setTouchStarted(false), 100);
  };

  const handleTouchStart = (e) => {
    // Prevent default to avoid double-triggering and scroll behavior
    e.preventDefault();
    e.stopPropagation();
    setTouchStarted(true);
    setIsPressed(true);
    console.log('Globe icon touched (touchstart), opening language selector', {
      touches: e.touches.length,
      type: e.type,
      target: e.target.tagName
    });
    setShowLanguageSelector(true);
  };

  const handleTouchEnd = (e) => {
    // Prevent default to avoid unwanted clicks
    e.preventDefault();
    e.stopPropagation();
    setIsPressed(false);
    console.log('Globe icon touch ended (touchend)', {
      changedTouches: e.changedTouches.length,
      type: e.type
    });
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsPressed(true);
    console.log('🌍 Globe icon pointer down, opening language selector', {
      pointerType: e.pointerType,
      type: e.type,
      isPrimary: e.isPrimary
    });
    setShowLanguageSelector(true);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsPressed(false);
  };

  const handleMouseDown = (e) => {
    setIsPressed(true);
    console.log('Globe icon mouse down detected', {
      button: e.button,
      type: e.type,
      which: e.which
    });
  };

  const handleMouseUp = (e) => {
    setIsPressed(false);
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className={className}
      style={getContainerStyles()}
    >
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 75,
          ...style 
        }}
        className="language-selector-icon-container"
      >
        <motion.button
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'min(8px, 1.5vw)',
            borderRadius: '50%',
            transition: 'transform 0.1s ease',
            transform: isPressed ? 'scale(0.95)' : 'scale(1)',
            position: 'relative',
            zIndex: 80,
            minWidth: '60px',
            minHeight: '60px',
            touchAction: 'manipulation',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          }}
          className="language-selector-icon-button"
          aria-label="Select Language"
        >
          <motion.img
            src="/images/OE_Sprache_64 1.svg"
            alt="Language selector"
            style={{
              ...baseIconStyles,
              touchAction: 'none',
              pointerEvents: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              draggable: false
            }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            draggable={false}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LanguageSelectorIcon;
