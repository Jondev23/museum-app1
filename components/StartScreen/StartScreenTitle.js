// Import React and responsive text hook
import { START_SCREEN_CONFIG } from './StartScreenConfig';
import React, { useRef, useEffect } from 'react';
import { processTextWithHTML } from '../../utils/textProcessor';
import { UI_TRANSITIONS } from '../../utils/screenTransitions';


// Start screen title component with responsive text and animations
const StartScreenTitle = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  titleStyle, 
  subtitleStyle,
  showOnlyTitle = false,
  showOnlySubtitle = false
}) => {
  
  const showTitle = showOnlyTitle || (!showOnlyTitle && !showOnlySubtitle);
  const showSubtitle = showOnlySubtitle || (!showOnlyTitle && !showOnlySubtitle);

  const titleRef = null;
  const subtitleRef = null;
  const adjustedTitleStyle = titleStyle;
  const adjustedSubtitleStyle = subtitleStyle;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {showTitle && (
        <h1
          ref={titleRef}
          className="typography-head text-primary"
          style={{
            ...adjustedTitleStyle,
            color: 'var(--color-text-primary)',
            ...UI_TRANSITIONS.contentFade.getOpacity(showContent)
          }}
        >
          {processTextWithHTML(startContent?.title || defaultTexts.title)}
        </h1>
      )}

      
      {showSubtitle && (
        <div className="w-full flex justify-center">
          <h2
            ref={subtitleRef}
            className="typography-subline"
            style={{
              ...adjustedSubtitleStyle,
              width: '98%',
              color: startContent?.subtitleColor || 'var(--color-blassgruen)',
              ...UI_TRANSITIONS.contentFade.getOpacity(showContent)
            }}
          >
            {processTextWithHTML(startContent?.subtitle || defaultTexts.subtitle)}
          </h2>
        </div>
      )}
    </div>
  );
};

export default StartScreenTitle;
