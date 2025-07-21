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
    console.log('Globe icon clicked, opening language selector');
    setShowLanguageSelector(true);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    console.log('Globe icon touched, opening language selector');
    setShowLanguageSelector(true);
  };

  return (
    <motion.div
      initial={getInitialAnimation()}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className={className}
      style={{
        ...getContainerStyles(),
        position: 'relative',
        zIndex: 100  // Z-index muy alto para asegurar que esté encima de todo
      }}
    >
      <motion.button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="transition-all cursor-pointer"
        style={{
          ...getButtonStyles(),
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          position: 'relative',
          zIndex: 101  // Incluso más alto que el contenedor
        }}
      >
        <motion.img
          src="/images/OE_Sprache_64 1.svg"
          alt="Language selector"
          style={{
            ...baseIconStyles,
            touchAction: 'manipulation',
            pointerEvents: 'none'
          }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.button>
    </motion.div>
  );
};

export default LanguageSelectorIcon;
