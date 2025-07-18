import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';

const StartScreenDescription = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  descriptionContainerStyle,
  highlightTextStyle,
  introTextStyle 
}) => {
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
        className="typography-antworten-buttons text-primary"
        style={{
          ...highlightTextStyle,
          display: 'block',
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--typography-antworten-buttons-font-weight)'
        }}
      >
        {startContent?.highlightText || defaultTexts.highlightText}
      </div>

      <div 
        className="typography-antwort-fliess text-primary"
        style={{
          ...introTextStyle,
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
