import { processTextWithHTML } from '../../utils/textProcessor';


// Display component for showing the user's selected answer in feedback screen
const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="inline-flex items-center justify-center relative"
        style={{
          ...answerButtonStyle,
          backgroundColor: 'var(--color-neutral-light)',
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        <span
          className="feedback-answer-text w-full"
        >
          {/* Display the selected answer text */}
          {processTextWithHTML(question.answers[userAnswer])}
        </span>
      </div>
    </div>
  );
};

export default FeedbackAnswer;
