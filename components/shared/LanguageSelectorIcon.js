import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const LanguageSelectorIcon = ({ 
  variant = 'standard',
  className = '',
  style = {},
  delay = 0.6,
  opacity = 0.8
}) => {
  const { setShowLanguageSelector } = useApp();

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

  const handleClick = () => {
    console.log('Globe icon clicked (click event), opening language selector');
    setShowLanguageSelector(true);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    console.log('Globe icon touch ended (touchend), opening language selector', {
      changedTouches: e.changedTouches.length,
      type: e.type
    });
    // No ejecutar aquí para evitar doble ejecución
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Globe icon pointer down, opening language selector', {
      pointerType: e.pointerType,
      type: e.type,
      isPrimary: e.isPrimary
    });
    if (e.pointerType === 'touch') {
      setShowLanguageSelector(true);
    }
  };

  const handleMouseDown = (e) => {
    console.log('Globe icon mouse down detected', {
      button: e.button,
      type: e.type,
      which: e.which
    });
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
        onMouseDown={handleMouseDown}
        className="transition-all cursor-pointer"
        style={{
          ...getButtonStyles(),
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          MsTouchAction: 'manipulation', // Específico para IE/Edge
          background: 'transparent',
          border: 'none',
          padding: '12px', // Área táctil aún más grande
          margin: '-12px', // Compensar el padding
          borderRadius: '50%',
          minWidth: '60px',
          minHeight: '60px',
          outline: 'none'
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
