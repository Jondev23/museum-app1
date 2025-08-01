
import useResponsiveText from '../../hooks/useResponsiveText';
import { processTextWithHTML } from '../../utils/textProcessor';

// Feedback message component displaying result and explanation
const FeedbackMessage = ({ 
  randomMessage, 
  question, 
  messageContainerStyle, 
  messageStyle, 
  explanationStyle 
}) => {
  // Responsive text sizing for feedback message
  const { ref: messageRef, adjustedStyle: adjustedMessageStyle, isAdjusted: isMessageAdjusted } = useResponsiveText(
    messageStyle,
    randomMessage,
    {
      minScale: 0.99, 
      step: 0.5,    
      delay: 150    
    }
  );

  // Responsive text sizing for explanation
  const { ref: explanationRef, adjustedStyle: adjustedExplanationStyle, isAdjusted: isExplanationAdjusted } = useResponsiveText(
    explanationStyle,
    question?.explanation,
    {
      minScale: 0.99, 
      step: 0.33,    
      delay: 200    
    }
  );

  return (
    <div style={messageContainerStyle}>
      <p
        ref={messageRef}
        style={{
          ...adjustedMessageStyle,
          color: 'var(--color-white)' 
        }}
        title={isMessageAdjusted ? 'Text adjusted automatically' : ''}
      >
        {/* Display feedback message */}
        {processTextWithHTML(randomMessage)}
      </p>

      {/* Show explanation if available */}
      {question?.explanation && (
        <p
          ref={explanationRef}
          style={{
            ...adjustedExplanationStyle,
            color: 'var(--color-white)' 
          }}
          title={isExplanationAdjusted ? 'Text adjusted automatically' : ''}
        >
          {processTextWithHTML(question.explanation)}
        </p>
      )}
    </div>
  );
};

export default FeedbackMessage;
