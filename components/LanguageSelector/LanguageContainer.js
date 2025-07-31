import { motion, getLanguageSelectorTransition } from '../../utils/screenTransitions';

// Animated container wrapper for language selector content
const LanguageContainer = ({ onContentClick, children }) => {
  return (
    <motion.div
      {...getLanguageSelectorTransition('container')}
      className="language-container"
      onClick={onContentClick}
    >
      {children}
    </motion.div>
  );
};

export default LanguageContainer;
