import { motion } from '../../utils/screenTransitions';
import { DEFAULT_CONTENT } from './LanguageSelectorConfig';

// Language selection icon component with animation
const LanguageIcon = () => {
  return (
    <motion.div
      className="flex items-center justify-center slide-up-animation standard-timing"
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
