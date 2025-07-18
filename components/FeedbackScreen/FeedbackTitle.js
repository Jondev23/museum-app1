import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackTitle = ({ question, titleStyle }) => {
  const [adjustedStyle, setAdjustedStyle] = useState(titleStyle);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const element = titleRef.current;
      const maxHeight = window.innerHeight * 0.15; // 15vh
      
      // Función para ajustar el tamaño de fuente
      const adjustFontSize = () => {
        let currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        const minSize = parseFloat(window.getComputedStyle(element).fontSize) * 0.6; // 60% del tamaño original
        
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.TITLE }}
      className="title-question"
      style={adjustedStyle}
    >
      {question.question}
    </motion.h1>
  );
};

export default FeedbackTitle;
