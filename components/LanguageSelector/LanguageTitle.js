import { motion } from '../../utils/screenTransitions';
import { ANIMATION_CONFIG, STYLE_CONFIG } from './LanguageSelectorConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Title component for language selector with bilingual text
const LanguageTitle = ({ englishTitle, germanTitle }) => {
  return (
    <motion.div
      initial={ANIMATION_CONFIG.TITLE.INITIAL}
      animate={ANIMATION_CONFIG.TITLE.ANIMATE}
      transition={ANIMATION_CONFIG.TITLE.TRANSITION}
      style={STYLE_CONFIG.TITLE_CONTAINER}
    >
      <h1 className="title-question language-title">
        {processTextWithHTML(englishTitle)}
      </h1>
      <h2 className="title-question language-subtitle">
        {processTextWithHTML(germanTitle)}
      </h2>
    </motion.div>
  );
};

export default LanguageTitle;
