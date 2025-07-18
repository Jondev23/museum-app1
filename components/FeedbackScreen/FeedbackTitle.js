import { motion } from 'framer-motion';
import { FEEDBACK_CONFIG } from './FeedbackScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';

const FeedbackTitle = ({ question, titleStyle }) => {
  const { ref, adjustedStyle, isAdjusted } = useResponsiveText(
    titleStyle,
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
