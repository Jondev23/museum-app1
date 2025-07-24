import React from 'react';
import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

// Feedback screen title component with line break processing
const FeedbackTitle = ({ question, titleStyle }) => {
  // Process question text to handle line breaks
  const processQuestionText = (text) => {
    if (text.includes(' / ')) {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.TITLE }}
      className="feedback-title"
      style={{
        width: titleStyle.width,
        height: titleStyle.height,
        maxWidth: titleStyle.maxWidth,
        overflowWrap: titleStyle.overflowWrap,
        overflow: titleStyle.overflow,
        display: titleStyle.display,
        alignItems: titleStyle.alignItems,
        justifyContent: titleStyle.justifyContent,
        textAlign: titleStyle.textAlign,
        wordBreak: titleStyle.wordBreak,
        hyphens: titleStyle.hyphens
      }}
    >
      {processQuestionText(question.question)}
    </motion.h1>
  );
};

export default FeedbackTitle;
