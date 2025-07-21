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

  const handleAction = (eventType) => {
    console.log(`🌍 Language selector triggered by: ${eventType}`);
    setShowLanguageSelector(true);
  };

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className={className}
      style={{
        flexShrink: 0,
        marginBottom: 'min(6rem, 9.5vh)',
        marginLeft: 'min(5.125rem, 8vw)',
        ...style
      }}
    >
      <motion.button
        onClick={() => handleAction('CLICK')}
        onTouchStart={(e) => {
          e.preventDefault();
          handleAction('TOUCH');
        }}
        onPointerDown={() => handleAction('POINTER')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="language-selector-icon-button"
        style={{
          minWidth: '60px',
          minHeight: '60px',
          background: 'none',
          border: '2px solid red', // DEBUG
          cursor: 'pointer',
          touchAction: 'manipulation',
          padding: '8px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src="/images/OE_Sprache_64 1.svg"
          alt="Language selector"
          style={{
            width: 'min(2.7rem, 4.86vw, 6.075vh)',
            height: 'min(2.7rem, 4.86vw, 6.075vh)',
            pointerEvents: 'none'
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default LanguageSelectorIcon;
