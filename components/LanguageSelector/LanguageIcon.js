import { motion } from 'framer-motion';
import { ANIMATION_CONFIG, STYLE_CONFIG, DEFAULT_CONTENT } from './LanguageSelectorConfig';

const LanguageIcon = () => {
  return (
    <motion.div
      initial={ANIMATION_CONFIG.GLOBE_ICON.INITIAL}
      animate={ANIMATION_CONFIG.GLOBE_ICON.ANIMATE}
      transition={ANIMATION_CONFIG.GLOBE_ICON.TRANSITION}
      style={STYLE_CONFIG.GLOBE_ICON}
    >
      <img 
        src={DEFAULT_CONTENT.iconSrc}
        alt={DEFAULT_CONTENT.iconAlt}
        style={STYLE_CONFIG.GLOBE_ICON.iconStyle}
      />
    </motion.div>
  );
};

export default LanguageIcon;
