import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const LanguageSelectorIcon = ({ 
  variant = 'default', // 'default', 'footer', 'absolute'
  className = '',
  style = {},
  delay = 0.6,
  opacity = 0.8
}) => {
  const { setShowLanguageSelector } = useApp();

  // Consistent base styles for all variants
  const baseIconStyles = {
    width: 'min(3rem, 5.4vw, 6.75vh)', // Consistent size across all screens
    height: 'min(3rem, 5.4vw, 6.75vh)',
    display: 'block',
    opacity: opacity
  };

  // Variant-specific container styles
  const getContainerStyles = () => {
    switch (variant) {
      case 'footer':
        // For footer positioning (FeedbackScreen)
        return {
          flexShrink: 0,
          marginBottom: 'min(5.625rem, 9vh)',
          marginLeft: 'min(6.125rem, 10vw)',
          ...style
        };
        
      case 'absolute':
        // For absolute positioning (ResultsScreen)
        return {
          marginLeft: 'min(3.5rem, 5vw)',
          marginBottom: 'min(2.5rem, 4vh)',
          ...style
        };
        
      default:
        // Default positioning (StartScreen, QuestionScreen)
        return {
          marginLeft: 'min(6.5rem, 12vw)',
          ...style
        };
    }
  };

  // Variant-specific button styles
  const getButtonStyles = () => {
    switch (variant) {
      case 'footer':
        return {
          minWidth: 'min(3.5rem, 6vw)',
          minHeight: 'min(3.5rem, 6vh)'
        };
        
      case 'absolute':
        return {
          background: 'transparent',
          border: 'none',
          padding: 0
        };
        
      default:
        return {};
    }
  };

  // Animation variants
  const getInitialAnimation = () => {
    switch (variant) {
      case 'footer':
        return { y: '100%', opacity: 0 };
      default:
        return { y: 100, opacity: 0 };
    }
  };

  const handleClick = () => {
    console.log('Globe icon clicked, opening language selector');
    setShowLanguageSelector(true);
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="transition-all cursor-pointer"
        style={getButtonStyles()}
      >
        <motion.img
          src="/images/OE_Sprache_64 1.svg"
          alt="Language selector"
          style={baseIconStyles}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.button>
    </motion.div>
  );
};

export default LanguageSelectorIcon;
