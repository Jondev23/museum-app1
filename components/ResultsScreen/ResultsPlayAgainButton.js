import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';

const ResultsPlayAgainButton = ({ 
  playAgainText, 
  showContent, 
  onPlayAgain,
  iconSrc = '/images/GUI.svg',
  iconAlt = 'Restart icon'
}) => {
  const handleTouchStart = (e) => {
    e.preventDefault();
    onPlayAgain();
  };

  return (
    <motion.div
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.BUTTON 
      }}
      className="fixed left-0 right-0 flex justify-center items-center z-50"
      style={{ bottom: 'var(--spacing-md)' }}
    >
      <motion.button
        onClick={onPlayAgain}
        onTouchStart={handleTouchStart}
        whileHover={ANIMATION_CONFIG.BUTTON.HOVER}
        whileTap={ANIMATION_CONFIG.BUTTON.TAP}
        className="text-button flex items-center bg-transparent border-none"
        style={{ 
          gap: 'var(--spacing-sm)',
          padding: 'var(--spacing-md)',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        {playAgainText}
        <img
          src={iconSrc}
          alt={iconAlt}
          style={{
            width: 'var(--spacing-2xl)',
            height: 'calc(var(--spacing-2xl) * 1.6)',
            touchAction: 'manipulation',
            pointerEvents: 'none'
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default ResultsPlayAgainButton;
