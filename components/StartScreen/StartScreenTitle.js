import React from 'react';
import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';

const StartScreenTitle = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  titleStyle, 
  subtitleStyle,
  showOnlyTitle = false,
  showOnlySubtitle = false
}) => {
  
  const processText = (text) => {
    if (text && text.includes(' / ')) {
      const parts = text.split(' / ');
      return (
        <>
          {parts[0].trim()}
          <br />
          {parts[1].trim()}
        </>
      );
    }
    return text;
  };
  
  const showTitle = showOnlyTitle || (!showOnlyTitle && !showOnlySubtitle);
  const showSubtitle = showOnlySubtitle || (!showOnlyTitle && !showOnlySubtitle);

  const titleRef = null;
  const subtitleRef = null;
  const adjustedTitleStyle = titleStyle;
  const adjustedSubtitleStyle = subtitleStyle;

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      
      {showTitle && (
        <motion.h1
          ref={titleRef}
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ 
            duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
            delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.TITLE 
          }}
          className="typography-head text-primary"
          style={{
            ...adjustedTitleStyle,
            color: 'var(--color-text-primary)'
          }}
        >
          {processText(startContent?.title || defaultTexts.title)}
        </motion.h1>
      )}

      
      {showSubtitle && (
        <div className="w-full flex justify-center">
          <motion.h2
            ref={subtitleRef}
            initial={{ y: 50, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ 
              duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
              delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.SUBTITLE 
            }}
            className="typography-subline"
            style={{
              ...adjustedSubtitleStyle,
              width: '98%',
              color: startContent?.subtitleColor || 'var(--color-blassgruen)'
            }}
          >
            {processText(startContent?.subtitle || defaultTexts.subtitle)}
          </motion.h2>
        </div>
      )}
    </div>
  );
};

export default StartScreenTitle;
