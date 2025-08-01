import useResponsiveText from '../../hooks/useResponsiveText';
import { processTextWithHTML } from '../../utils/textProcessor';

const StartScreenDescription = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  descriptionContainerStyle,
  highlightTextStyle,
  introTextStyle 
}) => {
  // Responsive sizing for highlight text
  const { ref: highlightRef, adjustedStyle: adjustedHighlightStyle } = useResponsiveText(
    highlightTextStyle,
    startContent?.highlightText || defaultTexts.highlightText,
    { minScale: 0.4, step: 2, delay: 200 }
  );

  // Responsive sizing for intro text
  const { ref: introRef, adjustedStyle: adjustedIntroStyle } = useResponsiveText(
    introTextStyle,
    startContent?.introText || defaultTexts.introText,
    { minScale: 0.4, step: 1, delay: 200 }
  );

  return (
    <div
      className="start-screen-description"
      style={{
        ...descriptionContainerStyle
      }}
    >
      <div 
        ref={highlightRef}
        className="start-screen-highlight"
        style={{
          ...adjustedHighlightStyle,
          display: 'block'
        }}
      >
        {processTextWithHTML(startContent?.highlightText || defaultTexts.highlightText)}
      </div>

      <div 
        ref={introRef}
        className="start-screen-description"
        style={{
          ...adjustedIntroStyle,
          display: 'block'
        }}
      >
        {processTextWithHTML(startContent?.introText || defaultTexts.introText)}
      </div>
    </div>
  );
};

export default StartScreenDescription;
