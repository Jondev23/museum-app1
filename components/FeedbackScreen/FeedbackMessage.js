import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackMessage = ({ 
  randomMessage, 
  question, 
  messageContainerStyle, 
  messageStyle, 
  explanationStyle 
}) => {
  const messageRef = useRef(null);
  const explanationRef = useRef(null);

  useEffect(() => {
    const adjustTextSize = () => {
      if (messageRef.current) {
        const container = messageRef.current.parentElement;
        if (!container) return;
        
        const containerHeight = container.clientHeight;
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkAndAdjust = () => {
          const totalScrollHeight = container.scrollHeight;
          
          if (totalScrollHeight > containerHeight && attempts < maxAttempts) {
            attempts++;
            
            // Ajustar mensaje principal
            if (messageRef.current) {
              let currentFontSize = parseFloat(window.getComputedStyle(messageRef.current).fontSize);
              const minFontSize = currentFontSize * 0.6;
              
              if (currentFontSize > minFontSize) {
                currentFontSize -= 0.5;
                messageRef.current.style.fontSize = `${currentFontSize}px`;
                messageRef.current.style.lineHeight = `${currentFontSize * 1.25}px`;
              }
            }
            
            // Ajustar explicación proporcionalmente
            if (explanationRef.current) {
              let explanationFontSize = parseFloat(window.getComputedStyle(explanationRef.current).fontSize);
              const minExplanationFontSize = explanationFontSize * 0.6;
              
              if (explanationFontSize > minExplanationFontSize) {
                explanationFontSize -= 0.33;
                explanationRef.current.style.fontSize = `${explanationFontSize}px`;
                explanationRef.current.style.lineHeight = `${explanationFontSize * 1.67}px`;
              }
            }
            
            // Verificar nuevamente después de un pequeño delay
            setTimeout(checkAndAdjust, 10);
          }
        };
        
        checkAndAdjust();
      }
    };

    const timer = setTimeout(adjustTextSize, 100);
    return () => clearTimeout(timer);
  }, [randomMessage, question.explanation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
      style={messageContainerStyle}
    >
      <p
        ref={messageRef}
        className="text-body-bold"
        style={messageStyle}
      >
        {randomMessage}
      </p>
      {question.explanation && (
        <p
          ref={explanationRef}
          className="text-body-primary"
          style={explanationStyle}
        >
          {question.explanation}
        </p>
      )}
    </motion.div>
  );
};

export default FeedbackMessage;
