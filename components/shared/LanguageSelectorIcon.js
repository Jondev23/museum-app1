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

  // Standard position based on FeedbackScreen layout
  const getContainerStyles = () => {
    return {
      flexShrink: 0,
      marginBottom: 'min(6rem, 9.5vh)',
      marginLeft: 'min(5.125rem, 8vw)',
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
    // Solo manejar click si no fue iniciado por touch
    if (!touchStarted) {
      e.stopPropagation();
      console.log('Globe icon clicked, opening language selector');
      setShowLanguageSelector(true);
    }
    // Reset touch flag después de un delay corto
    setTimeout(() => setTouchStarted(false), 100);
  };

  const handleTouchStart = (e) => {
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
    console.log('Globe icon pointer down, opening language selector', {
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
      <motion.button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="transition-all cursor-pointer"
        style={{
          ...getButtonStyles(),
          transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s ease',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          background: 'none',
          border: 'none',
          padding: 'min(8px, 1.5vw)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 80
        }}
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
    </motion.div>
  );
};

export default LanguageSelectorIcon;
