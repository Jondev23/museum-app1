import { motion } from '../../utils/screenTransitions';
import { ANIMATION_CONFIG } from './LanguageSelectorConfig';

// Animated container wrapper for language selector content
const LanguageContainer = ({ onContentClick, children }) => {
  return (
    <motion.div
      initial={ANIMATION_CONFIG.CONTAINER.INITIAL}
      animate={ANIMATION_CONFIG.CONTAINER.ANIMATE}
      exit={ANIMATION_CONFIG.CONTAINER.EXIT}
      transition={ANIMATION_CONFIG.CONTAINER.TRANSITION}
      className="language-container"
      onClick={onContentClick}
    >
      {children}
    </motion.div>
  );
};

export default LanguageContainer;
