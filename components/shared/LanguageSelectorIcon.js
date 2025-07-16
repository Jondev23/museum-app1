import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const LanguageSelectorIcon = ({ 
  variant = 'standard', // 'standard' uses FeedbackScreen position as default
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

  // Standard position based on FeedbackScreen layout
  const getContainerStyles = () => {
    return {
      flexShrink: 0,
      marginBottom: 'min(5.625rem, 9vh)', // Uses vh for vertical in landscape
      marginLeft: 'min(6.125rem, 10vw)', // Standard left margin
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
