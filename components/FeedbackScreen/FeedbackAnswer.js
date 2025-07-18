import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';
import { COLORS } from '../../utils/cssVariables';

const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const adjustTextSize = () => {
      if (textRef.current && buttonRef.current) {
        const text = textRef.current;
        const button = buttonRef.current;
        
        let attempts = 0;
        const maxAttempts = 30;
        
        const checkAndAdjust = () => {
          if (attempts < maxAttempts) {
            const textWidth = text.scrollWidth;
            const buttonWidth = button.clientWidth;
            const textHeight = text.scrollHeight;
            const buttonHeight = button.clientHeight;
            
            // Verificar desbordamiento horizontal y vertical
            if ((textWidth > buttonWidth || textHeight > buttonHeight) && attempts < maxAttempts) {
              attempts++;
              
              let currentFontSize = parseFloat(window.getComputedStyle(text).fontSize);
              const minFontSize = currentFontSize * 0.6; // Reducir hasta 60%
              
              if (currentFontSize > minFontSize) {
                currentFontSize -= 0.5;
                text.style.fontSize = `${currentFontSize}px`;
                text.style.lineHeight = `${currentFontSize * 1.25}px`;
                
                setTimeout(checkAndAdjust, 10);
              }
            }
          }
        };
        
        checkAndAdjust();
      }
    };

    const timer = setTimeout(adjustTextSize, 150);
    return () => clearTimeout(timer);
  }, [question.answers, userAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ANSWER }}
      className="flex justify-center"
      style={{ width: '100%' }}
    >
      <div
        ref={buttonRef}
        className={`${FEEDBACK_CONFIG.SIZES.BUTTON_BORDER_RADIUS} flex items-center justify-center`}
        style={{
          ...answerButtonStyle,
          backgroundColor: COLORS.FEEDBACK_ANSWER_BG,
        }}
      >
        <span
          ref={textRef}
          className="text-answer"
          style={answerTextStyle}
        >
          {question.answers[userAnswer]}
        </span>
      </div>
    </motion.div>
  );
};

export default FeedbackAnswer;
