import { motion, getLanguageSelectorTransition } from '../../utils/screenTransitions';

// Animated overlay component for language selector background
const LanguageOverlay = ({ onOverlayClick, children }) => {
  return (
    <motion.div
      {...getLanguageSelectorTransition('overlay')}
      className="language-overlay"
      onClick={onOverlayClick}
    >
      {children}
    </motion.div>
  );
};

export default LanguageOverlay;
