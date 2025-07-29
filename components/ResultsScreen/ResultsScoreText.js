
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Score text component for results screen with line break processing
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
        color: scoreTextColor || 'var(--color-blassgruen)' 
      }}
    >
      {processTextWithHTML(scoreText)}
    </motion.p>
  );
};

export default ResultsScoreText;
