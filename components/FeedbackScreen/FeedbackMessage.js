
import { processTextWithHTML } from '../../utils/textProcessor';

// Feedback message component displaying result and explanation
const FeedbackMessage = ({ 
  randomMessage, 
  question, 
  messageContainerStyle
}) => {
  return (
    <div style={messageContainerStyle}>
      <p className="feedback-message-text">
        {/* Display feedback message */}
        {processTextWithHTML(randomMessage)}
      </p>

      {/* Show explanation if available */}
      {question?.explanation && (
        <p className="feedback-explanation-text">
          {processTextWithHTML(question.explanation)}
        </p>
      )}
    </div>
  );
};

export default FeedbackMessage;
