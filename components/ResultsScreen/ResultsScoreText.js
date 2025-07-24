import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';

const ResultsScoreText = ({ scoreText, scoreTextColor, showContent }) => {
  const processText = (text) => {
    if (text && text.includes(' / ')) {
      const parts = text.split(' / ');
      return (
        <>
          {parts[0].trim()}
          <br />
          {parts[1].trim()}
        </>
      );
    }
    return text;
  };
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
      {processText(scoreText)}
    </motion.p>
  );
};

export default ResultsScoreText;
