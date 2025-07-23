import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';

const ResultsScoreText = ({ scoreText, scoreTextColor, showContent }) => {
  return (
    <motion.p
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.SUBTITLE 
      }}
      className="subtitle-small"
      style={{ 
        marginBottom: 'var(--results-title-margin)',
        color: scoreTextColor || 'var(--color-blassgruen)' // Use color from JSON or fallback to CSS variable
      }}
    >
      {scoreText}
    </motion.p>
  );
};

export default ResultsScoreText;
