import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';

const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  // Usar solo los estilos de layout del answerTextStyle, no los de tipografía
  const layoutStyle = {
    maxWidth: answerTextStyle.maxWidth,
    overflowWrap: answerTextStyle.overflowWrap,
    wordBreak: answerTextStyle.wordBreak,
    hyphens: answerTextStyle.hyphens,
    textAlign: answerTextStyle.textAlign,
    whiteSpace: answerTextStyle.whiteSpace
  };

  const { ref, adjustedStyle, isAdjusted } = useResponsiveText(
    layoutStyle,
    question.answers[userAnswer],
    {
      minScale: 0.6, // Puede reducirse hasta 60% del tamaño original
      step: 0.5,     // Reduce de 0.5px en 0.5px
      delay: 150     // Espera 150ms antes de ajustar
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.ANSWER }}
      className="flex justify-center"
      style={{ width: '100%' }}
    >
      <div
        className={`${FEEDBACK_CONFIG.SIZES.BUTTON_BORDER_RADIUS} flex items-center justify-center`}
        style={{
          ...answerButtonStyle,
          backgroundColor: 'var(--color-feedback-answer-bg)',
        }}
      >
        <span
          ref={ref}
          className="text-answer"
          style={adjustedStyle}
          title={isAdjusted ? 'Texto ajustado automáticamente' : ''}
        >
          {question.answers[userAnswer]}
        </span>
      </div>
    </motion.div>
  );
};

export default FeedbackAnswer;
