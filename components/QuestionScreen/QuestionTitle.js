import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { QUESTION_CONFIG } from './QuestionScreenConfig';

const QuestionTitle = ({ question }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const element = titleRef.current;
      const maxHeight = window.innerHeight * 0.2; // 20vh
      
      // Función para ajustar el tamaño de fuente
      const adjustFontSize = () => {
        let currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        const minSize = parseFloat(window.getComputedStyle(element).fontSize) * 0.6;
        
        // Reducir el tamaño si el contenido es muy alto
        while (element.scrollHeight > maxHeight && currentSize > minSize) {
          currentSize -= 1;
          element.style.fontSize = `${currentSize}px`;
          element.style.lineHeight = `${currentSize * 1.3}px`;
        }
      };

      // Ajustar tamaño después de que el contenido se renderice
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
      {question.question}
    </motion.h1>
  );
};

export default QuestionTitle;
