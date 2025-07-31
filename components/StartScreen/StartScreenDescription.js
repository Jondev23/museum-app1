import { START_SCREEN_CONFIG } from './StartScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';
import { processTextWithHTML } from '../../utils/textProcessor';

// Description component for start screen with responsive text sizing
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
      className="typography-antwort-fliess text-primary"
      style={{
        ...descriptionContainerStyle,
        color: 'var(--color-text-primary)',
        opacity: showContent ? 1 : 0
      }}
    >
      <div 
        ref={highlightRef}
        className="typography-antwort-fliess text-primary"
        style={{
          ...adjustedHighlightStyle,
          display: 'block',
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--typography-antwort-fliess-bold-font-weight) !important'
        }}
      >
        {/* Highlight text section */}
        {processTextWithHTML(startContent?.highlightText || defaultTexts.highlightText)}
      </div>

      <div 
        ref={introRef}
        className="typography-antwort-fliess text-primary"
        style={{
          ...adjustedIntroStyle,
          display: 'block',
          color: 'var(--color-text-primary)'
        }}
      >
        {/* Intro text section */}
        {processTextWithHTML(startContent?.introText || defaultTexts.introText)}
      </div>
    </div>
  );
};

export default StartScreenDescription;
