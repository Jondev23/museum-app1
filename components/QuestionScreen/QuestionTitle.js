import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

// Question title component with responsive text sizing and line break processing
const QuestionTitle = ({ question }) => {
  const titleRef = useRef(null);

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

  // Auto-adjust font size to fit container height
  useEffect(() => {
    if (titleRef.current) {
      const element = titleRef.current;
      const maxHeight = window.innerHeight * 0.2; // 20vh
      
      const adjustFontSize = () => {
        let currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        const minSize = parseFloat(window.getComputedStyle(element).fontSize) * 0.6;
        
        while (element.scrollHeight > maxHeight && currentSize > minSize) {
          currentSize -= 1;
          element.style.fontSize = `${currentSize}px`;
          element.style.lineHeight = `${currentSize * 1.3}px`;
        }
      };

      setTimeout(adjustFontSize, 100);
    }
  }, [question.question]);

  return (
    <motion.h1
      ref={titleRef}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: QUESTION_CONFIG.ANIMATION_DURATIONS.TITLE, 
        delay: QUESTION_CONFIG.ANIMATION_DELAYS.TITLE 
      }}
      className="typography-fragen text-primary relative w-full max-h-[20vh] overflow-hidden flex items-center justify-center text-center mb-[min(3rem,4vh)] mx-[min(4rem,5vw,6vh)] box-border"
    >
      {processQuestionText(question.question)}
    </motion.h1>
  );
};

export default QuestionTitle;
