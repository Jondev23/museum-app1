import { motion } from 'framer-motion';
import { ANIMATION_CONFIG, STYLE_CONFIG, DEFAULT_CONTENT } from './ResultsScreenConfig';

const ResultsPlayAgainButton = ({ 
  playAgainText, 
  showContent, 
  onPlayAgain,
  iconSrc = DEFAULT_CONTENT.iconSrc,
  iconAlt = DEFAULT_CONTENT.iconAlt
}) => {
  return (
    <motion.div
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.BUTTON 
      }}
      style={STYLE_CONFIG.BUTTON_CONTAINER}
    >
      <motion.button
        onClick={onPlayAgain}
        whileHover={ANIMATION_CONFIG.BUTTON.HOVER}
        whileTap={ANIMATION_CONFIG.BUTTON.TAP}
        className="flex items-center text-button"
        style={STYLE_CONFIG.BUTTON}
      >
        {playAgainText}
        <img
          src={iconSrc}
          alt={iconAlt}
          style={STYLE_CONFIG.ICON}
        />
      </motion.button>
    </motion.div>
  );
};

export default ResultsPlayAgainButton;
