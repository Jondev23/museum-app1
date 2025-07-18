import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';

const FeedbackTitle = ({ question, titleStyle }) => {
  // Usar solo los estilos de layout del titleStyle, no los de tipografía
  const layoutStyle = {
    width: titleStyle.width,
    height: titleStyle.height,
    maxWidth: titleStyle.maxWidth,
    overflowWrap: titleStyle.overflowWrap,
    overflow: titleStyle.overflow,
    display: titleStyle.display,
    alignItems: titleStyle.alignItems,
    justifyContent: titleStyle.justifyContent,
    textAlign: titleStyle.textAlign,
    wordBreak: titleStyle.wordBreak,
    hyphens: titleStyle.hyphens
  };

  const { ref, adjustedStyle, isAdjusted } = useResponsiveText(
    layoutStyle,
    question.question,
    {
      minScale: 0.5, 
      step: 1,      
      delay: 150    
    }
  );

  return (
    <motion.h1
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: FEEDBACK_CONFIG.ANIMATION_DURATIONS.TITLE }}
      className="title-question"
      style={adjustedStyle}
      title={isAdjusted ? 'Texto ajustado automáticamente' : ''}
    >
      {question.question}
    </motion.h1>
  );
};

export default FeedbackTitle;
