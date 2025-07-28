import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';

// Play again button component for restarting the quiz
const ResultsPlayAgainButton = ({ 
  playAgainText, 
  showContent, 
  onPlayAgain,
  iconSrc = '/images/GUI.svg',
  iconAlt = 'Restart icon'
}) => {
  return (
    <motion.div
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.BUTTON 
      }}
      className="fixed left-0 right-0 flex justify-center z-50"
      style={{ bottom: 'var(--results-play-again-bottom)' }}
    >
      <motion.button
        onClick={onPlayAgain} // Restart the quiz
        whileHover={ANIMATION_CONFIG.BUTTON.HOVER}
        whileTap={ANIMATION_CONFIG.BUTTON.TAP}
        className="flex items-center bg-transparent border-none"
        style={{ 
          gap: 'var(--spacing-sm)',
          padding: '0', 
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span className="text-button-play-again">
          {playAgainText}
        </span>
        <img
          src={iconSrc}
          alt={iconAlt}
          style={{
            width: '4.91625rem', 
            height: '2.71563rem', 
            touchAction: 'manipulation',
            pointerEvents: 'none'
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default ResultsPlayAgainButton;
