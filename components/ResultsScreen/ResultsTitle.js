// Import React, animation library, and results configuration
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Results title component with line break processing and animation
const ResultsTitle = ({ title, showContent }) => {
  return (
    <motion.h1
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.TITLE 
      }}
      className="title-results"
      style={{ 
        marginBottom: 'var(--results-title-margin)',
        paddingLeft: '15rem',
        paddingRight: '6rem'
      }}
    >
      {processTextWithHTML(title)}
    </motion.h1>
  );
};

export default ResultsTitle;
