import { motion } from '../../utils/screenTransitions';

// Animated container wrapper for language selector content
const LanguageContainer = ({ onContentClick, children }) => {
  return (
    <motion.div
      className="language-container scale-modal-animation standard-timing"
      onClick={onContentClick}
    >
      {children}
    </motion.div>
  );
};

export default LanguageContainer;
