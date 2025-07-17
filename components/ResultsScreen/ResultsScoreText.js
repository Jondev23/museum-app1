import { motion } from 'framer-motion';
import { ANIMATION_CONFIG, STYLE_CONFIG } from './ResultsScreenConfig';

const ResultsScoreText = ({ scoreText, showContent }) => {
  return (
    <motion.p
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.SUBTITLE 
      }}
      className="subtitle-main"
      style={STYLE_CONFIG.SUBTITLE}
    >
      {scoreText}
    </motion.p>
  );
};

export default ResultsScoreText;
