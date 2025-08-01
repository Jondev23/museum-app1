import { processTextWithHTML } from '../../utils/textProcessor';

// Feedback screen title component
const FeedbackTitle = ({ question, titleStyle }) => {
  // Extract only layout styles, avoid typography overrides
  const layoutStyles = {
    width: titleStyle.width,
    minHeight: titleStyle.minHeight,
    maxHeight: titleStyle.maxHeight,
    maxWidth: titleStyle.maxWidth,
    overflowWrap: titleStyle.overflowWrap,
    overflow: titleStyle.overflow,
    display: titleStyle.display,
    alignItems: titleStyle.alignItems,
    justifyContent: titleStyle.justifyContent,
    textAlign: titleStyle.textAlign,
    wordBreak: titleStyle.wordBreak,
    hyphens: titleStyle.hyphens,
    padding: titleStyle.padding,
    flex: titleStyle.flex
  };

  return (
    <h1
      className="feedback-title"
      style={layoutStyles}
    >
      {processTextWithHTML(question.question)}
    </h1>
  );
};

export default FeedbackTitle;
