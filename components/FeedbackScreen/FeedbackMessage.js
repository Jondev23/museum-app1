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
  // Usar solo los estilos de layout, no los de tipografía
  const messageLayoutStyle = {
    maxWidth: messageStyle.maxWidth,
    overflowWrap: messageStyle.overflowWrap,
    margin: messageStyle.margin,
    wordBreak: messageStyle.wordBreak,
    hyphens: messageStyle.hyphens,
    textAlign: messageStyle.textAlign
  };

  const explanationLayoutStyle = {
    maxWidth: explanationStyle.maxWidth,
    overflowWrap: explanationStyle.overflowWrap,
    margin: explanationStyle.margin,
    wordBreak: explanationStyle.wordBreak,
    hyphens: explanationStyle.hyphens,
    textAlign: explanationStyle.textAlign
  };

  const { ref: messageRef, adjustedStyle: adjustedMessageStyle, isAdjusted: isMessageAdjusted } = useResponsiveText(
    messageLayoutStyle,
    randomMessage,
    {
      minScale: 0.6, // Puede reducirse hasta 60% del tamaño original
      step: 0.5,     // Reduce de 0.5px en 0.5px
      delay: 150     // Espera 150ms antes de ajustar
    }
  );

  const { ref: explanationRef, adjustedStyle: adjustedExplanationStyle, isAdjusted: isExplanationAdjusted } = useResponsiveText(
    explanationLayoutStyle,
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
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE }}
      style={messageContainerStyle}
    >
      {/* Mensaje principal (¡Correcto! / ¡Incorrecto!) */}
      <motion.p
        ref={messageRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE + 0.1 }}
        style={adjustedMessageStyle}
        className="text-body-bold"
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
          transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.MESSAGE + 0.2 }}
          style={adjustedExplanationStyle}
          className="text-body-primary"
          title={isExplanationAdjusted ? 'Texto ajustado automáticamente' : ''}
        >
          {question.explanation}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FeedbackMessage;
