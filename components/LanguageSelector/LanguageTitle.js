import { motion, getLanguageSelectorTransition } from '../../utils/screenTransitions';
import { STYLE_CONFIG } from './LanguageSelectorConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Title component for language selector with bilingual text
const LanguageTitle = ({ englishTitle, germanTitle }) => {
  return (
    <motion.div
      {...getLanguageSelectorTransition('title')}
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
