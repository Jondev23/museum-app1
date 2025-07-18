import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';
import useResponsiveText from '../../hooks/useResponsiveText';

const StartScreenDescription = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  descriptionContainerStyle,
  highlightTextStyle,
  introTextStyle 
}) => {
  // Hooks para texto responsive
  const { ref: highlightRef, adjustedStyle: adjustedHighlightStyle } = useResponsiveText(
    highlightTextStyle,
    startContent?.highlightText || defaultTexts.highlightText,
    { minScale: 0.4, step: 2, delay: 200 }
  );

  const { ref: introRef, adjustedStyle: adjustedIntroStyle } = useResponsiveText(
    introTextStyle,
    startContent?.introText || defaultTexts.introText,
    { minScale: 0.4, step: 1, delay: 200 }
  );
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={showContent ? { y: 0, opacity: 1 } : {}}
      transition={{ 
        duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
        delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.DESCRIPTION 
      }}
      className="typography-antwort-fliess text-primary"
      style={{
        ...descriptionContainerStyle,
        color: 'var(--color-text-primary)'
      }}
    >
      <div 
        ref={highlightRef}
        className="typography-antworten-buttons text-primary"
        style={{
          ...adjustedHighlightStyle,
          display: 'block',
          marginBottom: '0.5rem',
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--typography-antworten-buttons-font-weight)'
        }}
      >
        {startContent?.highlightText || defaultTexts.highlightText}
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
        {startContent?.introText || defaultTexts.introText}
      </div>
    </motion.div>
  );
};

export default StartScreenDescription;
