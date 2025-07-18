import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';

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
      className="fixed left-0 right-0 bottom-6 flex justify-center items-center z-50"
    >
      <motion.button
        onClick={onPlayAgain}
        whileHover={ANIMATION_CONFIG.BUTTON.HOVER}
        whileTap={ANIMATION_CONFIG.BUTTON.TAP}
        className="text-button flex items-center gap-2 bg-transparent border-none p-4"
      >
        {playAgainText}
        <img
          src={iconSrc}
          alt={iconAlt}
          className="w-12 h-20"
        />
      </motion.button>
    </motion.div>
  );
};

export default ResultsPlayAgainButton;
