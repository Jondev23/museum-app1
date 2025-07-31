import { motion } from '../../utils/screenTransitions';
import { ANIMATION_CONFIG, DEFAULT_CONTENT } from './LanguageSelectorConfig';

// Language selection icon component with animation
const LanguageIcon = () => {
  return (
    <motion.div
      initial={ANIMATION_CONFIG.GLOBE_ICON.INITIAL}
      animate={ANIMATION_CONFIG.GLOBE_ICON.ANIMATE}
      transition={ANIMATION_CONFIG.GLOBE_ICON.TRANSITION}
      className="flex items-center justify-center"
    >
      <img 
        src={DEFAULT_CONTENT.iconSrc}
        alt={DEFAULT_CONTENT.iconAlt}
        className="language-icon"
      />
    </motion.div>
  );
};

export default LanguageIcon;
