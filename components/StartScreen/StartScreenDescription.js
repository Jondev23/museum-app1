import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';

const StartScreenDescription = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  descriptionContainerStyle,
  highlightTextStyle,
  introTextStyle 
}) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    animate={showContent ? { y: 0, opacity: 1 } : {}}
    transition={{ 
      duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
      delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.DESCRIPTION 
    }}
    className="text-body-primary"
    style={descriptionContainerStyle}
  >
    <span 
      className="text-body-bold"
      style={highlightTextStyle}
    >
      {startContent?.highlightText || defaultTexts.highlightText}&nbsp;&nbsp;
      <br />
    </span>

    <span 
      className="text-body-primary"
      style={introTextStyle}
    >
      {startContent?.introText || defaultTexts.introText}
    </span>
  </motion.div>
);

export default StartScreenDescription;
