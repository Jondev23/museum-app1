import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Play again button component - inherits parent animation (slides from right)
const ResultsPlayAgainButton = ({ 
  playAgainText, 
  showContent, 
  onPlayAgain,
  iconSrc = './images/GUI.svg',
  iconAlt = 'Restart icon'
}) => {
  return (
    <div
      className="flex justify-center w-full"
      style={{
        opacity: showContent ? 1 : 0, // Simple opacity control, no competing animation
        transition: `opacity 0.3s ease ${ANIMATION_CONFIG.DELAYS.BUTTON}s` // Delayed opacity transition
      }}
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
          {processTextWithHTML(playAgainText)}
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
    </div>
  );
};

export default ResultsPlayAgainButton;
