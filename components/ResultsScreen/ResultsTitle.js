import { motion } from 'framer-motion';
import { ANIMATION_CONFIG, STYLE_CONFIG } from './ResultsScreenConfig';

const ResultsTitle = ({ title, showContent }) => {
  return (
    <motion.h1
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.TITLE 
      }}
      className="title-main"
      style={STYLE_CONFIG.TITLE}
    >
      {title}
    </motion.h1>
  );
};

export default ResultsTitle;
