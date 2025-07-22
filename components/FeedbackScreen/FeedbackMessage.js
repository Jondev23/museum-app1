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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
      style={messageContainerStyle}
    >
      {/* Mensaje principal (¡Correcto! / ¡Incorrecto!) */}
      <motion.p
        ref={messageRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
        style={{
          ...adjustedMessageStyle,
          color: 'var(--color-white)' // Color blanco para que se vea sobre el fondo colorido
        }}
        title={isMessageAdjusted ? 'Texto ajustado automáticamente' : ''}
      >
        {randomMessage}
      </motion.p>

      {/* Explicación adicional */}
      {question?.explanation && (
        <motion.p
          ref={explanationRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
          style={{
            ...adjustedExplanationStyle,
            color: 'var(--color-white)' // Color blanco para que se vea sobre el fondo colorido
          }}
          title={isExplanationAdjusted ? 'Texto ajustado automáticamente' : ''}
        >
          {question.explanation}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FeedbackMessage;
