import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from './LanguageSelectorConfig';

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
