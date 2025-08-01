import { processTextWithHTML } from '../../utils/textProcessor';


// Display component for showing the user's selected answer in feedback screen
const FeedbackAnswer = ({ question, userAnswer, answerButtonStyle, answerTextStyle }) => {
  return (
    <div className="flex justify-center w-full">
      <div
        className="inline-flex items-center justify-center gap-[min(0.5rem,1vw)] relative"
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
          className="typography-antworten-buttons relative w-full text-center break-words hyphens-auto max-w-full"
          style={{
            color: answerTextStyle.color,
            overflowWrap: answerTextStyle.overflowWrap,
            wordBreak: answerTextStyle.wordBreak,
            hyphens: answerTextStyle.hyphens,
            whiteSpace: answerTextStyle.whiteSpace,
            transform: answerTextStyle.transform
          }}
        >
          {/* Display the selected answer text */}
          {processTextWithHTML(question.answers[userAnswer])}
        </span>
      </div>
    </div>
  );
};

export default FeedbackAnswer;
