// Import animation library and app context
import { motion } from 'framer-motion';
import { getPageTransition, getInteractiveTransition } from '../../utils/screenTransitions';
import { useApp } from '../../context/AppContext';

// Language selector icon component - trigger for language overlay
const LanguageSelectorIcon = ({ 
  variant = 'standard',
  className = '',
  style = {},
  delay = 0.6,
  opacity = 0.8
}) => {
  // Get language selector toggle function from app context
  const { setShowLanguageSelector } = useApp();

  // Base styles for the icon
  const baseIconStyles = {
    width: '4rem', 
    height: '4rem', 
    display: 'block',
    opacity: opacity
  };

  // Get container styles based on variant
  const getContainerStyles = () => {
    return {
      flexShrink: 0,
      marginBottom: 'min(4.7rem, 8.2vh)',
      marginLeft: 'min(10rem, 7.5vw)', 
      ...style
    };
  };

  // Get button styles for touch target
  const getButtonStyles = () => {
    return {
      minWidth: 'min(3.5rem, 6vw)',
      minHeight: 'min(3.5rem, 6vh)'
    };
  };

  // Animation settings for entrance
  const getInitialAnimation = () => {
    return { y: '100%', opacity: 0 };
  };

  // Handle click to open language selector
  const handleClick = () => {
    console.log('Globe icon clicked, opening language selector');
    setShowLanguageSelector(true);
  };

  // Handle touch for mobile devices
  const handleTouchStart = (e) => {
    e.preventDefault();
    console.log('Globe icon touched, opening language selector');
    setShowLanguageSelector(true);
  };

  return (
    <div
      className={className}
      style={getContainerStyles()}
    >
      <motion.button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        whileHover={getInteractiveTransition('button').hover}
        whileTap={getInteractiveTransition('button').tap}
        className="transition-all cursor-pointer relative"
        style={{
          ...getButtonStyles(),
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          zIndex: 50  
        }}
      >
        <motion.img
          src="./images/OE_Sprache_64.svg"
          alt="Language selector"
          style={{
            ...baseIconStyles,
            touchAction: 'manipulation',
            pointerEvents: 'none'
          }}
        />
      </motion.button>
    </div>
  );
};

export default LanguageSelectorIcon;
