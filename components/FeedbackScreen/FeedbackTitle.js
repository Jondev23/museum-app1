import { processTextWithHTML } from '../../utils/textProcessor';

// Feedback screen title component
const FeedbackTitle = ({ question, titleStyle }) => {
  return (
    <h1
      className="feedback-title"
      style={{ ...titleStyle }}
    >
      {processTextWithHTML(question.question)}
    </h1>
  );
};

export default FeedbackTitle;
