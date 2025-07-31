// Import React and feedback configuration

import { processTextWithHTML } from '../../utils/textProcessor';

// Feedback screen title component with line break processing
const FeedbackTitle = ({ question, titleStyle }) => {
  return (
    <h1
      className="feedback-title"
      style={{
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
      }}
    >
      {processTextWithHTML(question.question)}
    </h1>
  );
};

export default FeedbackTitle;
