import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './ResultsScreenConfig';

const ResultsTitle = ({ title, showContent }) => {
  // Función para procesar saltos de línea con "/"
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
    <motion.h1
      initial={ANIMATION_CONFIG.CONTENT_REVEAL.INITIAL}
      animate={showContent ? ANIMATION_CONFIG.CONTENT_REVEAL.ANIMATE : {}}
      transition={{ 
        ...ANIMATION_CONFIG.CONTENT_REVEAL.TRANSITION, 
        delay: ANIMATION_CONFIG.DELAYS.TITLE 
      }}
      className="title-results"
      style={{ marginBottom: 'var(--results-title-margin)' }}
    >
      {processText(title)}
    </motion.h1>
  );
};

export default ResultsTitle;
