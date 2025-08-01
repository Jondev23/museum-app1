import { motion } from '../../utils/screenTransitions';

// Animated overlay component for language selector background
const LanguageOverlay = ({ onOverlayClick, children }) => {
  return (
    <motion.div
      className="language-overlay fade-animation standard-timing"
      onClick={onOverlayClick}
    >
      {children}
    </motion.div>
  );
};

export default LanguageOverlay;
