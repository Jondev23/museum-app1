import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';

const FeedbackMessage = ({ 
  randomMessage, 
  question, 
  messageContainerStyle, 
  messageStyle, 
  explanationStyle 
}) => {
  const { ref: messageRef, adjustedStyle: adjustedMessageStyle, isAdjusted: isMessageAdjusted } = useResponsiveText(
    messageStyle,
    randomMessage,
    {
      minScale: 0.6, // Puede reducirse hasta 60% del tamaño original
      step: 0.5,     // Reduce de 0.5px en 0.5px
      delay: 150     // Espera 150ms antes de ajustar
    }
  );

  const { ref: explanationRef, adjustedStyle: adjustedExplanationStyle, isAdjusted: isExplanationAdjusted } = useResponsiveText(
    explanationStyle,
    question?.explanation,
    {
      minScale: 0.6, // Puede reducirse hasta 60% del tamaño original
      step: 0.33,    // Reduce de 0.33px en 0.33px (más fino)
      delay: 200     // Espera 200ms antes de ajustar
    }
  );
            
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
