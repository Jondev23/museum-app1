import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './LanguageSelectorConfig';

const LanguageOverlay = ({ onOverlayClick, children }) => {
  return (
    <motion.div
      initial={ANIMATION_CONFIG.OVERLAY.INITIAL}
      animate={ANIMATION_CONFIG.OVERLAY.ANIMATE}
      exit={ANIMATION_CONFIG.OVERLAY.EXIT}
      transition={ANIMATION_CONFIG.OVERLAY.TRANSITION}
      className="language-overlay"
      onClick={onOverlayClick}
    >
      {children}
    </motion.div>
  );
};

export default LanguageOverlay;
