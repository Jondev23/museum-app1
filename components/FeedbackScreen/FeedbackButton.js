import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';

const FeedbackButton = ({ 
  buttonText, 
  nextQuestion, 
  buttonContainerStyle, 
  buttonStyle, 
  buttonTextStyle, 
  arrowStyle 
}) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  // Usar solo el textTransform del buttonTextStyle, el resto viene de la clase CSS
  const layoutStyle = {
    textTransform: buttonTextStyle.textTransform
  };

  useEffect(() => {
    const adjustButtonSize = () => {
      if (textRef.current) {
        const text = textRef.current;
        const button = buttonRef.current;
        
        // Solo ajustar el texto si se desborda
        let attempts = 0;
        const maxAttempts = 20;
        
        const checkAndAdjust = () => {
          if (button && text && attempts < maxAttempts) {
            const buttonWidth = button.scrollWidth;
            const maxAllowedWidth = window.innerWidth * 0.35; // 35% del ancho de pantalla
            
            if (buttonWidth > maxAllowedWidth) {
              attempts++;
              
              let currentFontSize = parseFloat(window.getComputedStyle(text).fontSize);
              const minFontSize = currentFontSize * 0.7; // Reducir hasta 70%
              
              if (currentFontSize > minFontSize) {
                currentFontSize -= 0.5;
                text.style.fontSize = `${currentFontSize}px`;
                
                setTimeout(checkAndAdjust, 10);
              }
            }
          }
        };
        
        checkAndAdjust();
      }
    };

    const timer = setTimeout(adjustButtonSize, 200);
    return () => clearTimeout(timer);
  }, [buttonText]);

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.BUTTON, 
        delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.BUTTON_DELAY 
      }}
      style={buttonContainerStyle}
    >
      <motion.button
        ref={buttonRef}
        onClick={nextQuestion}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 transition-all cursor-pointer"
        style={buttonStyle}
      >
        <span
          ref={textRef}
          className="text-button"
          style={layoutStyle}
        >
          {buttonText}
        </span>
        <motion.img
          src="/images/GUI-2.svg"
          alt="Zur Auswertung"
          style={arrowStyle}
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ARROW_ANIMATION, 
            repeat: Infinity, 
            repeatDelay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ARROW_REPEAT_DELAY 
          }}
        />
      </motion.button>
    </motion.div>
  );
};

export default FeedbackButton;
