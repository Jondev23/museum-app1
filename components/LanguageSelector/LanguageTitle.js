import { STYLE_CONFIG } from './LanguageSelectorConfig';
import { processTextWithHTML } from '../../utils/textProcessor';

// Title component for language selector with bilingual text
const LanguageTitle = ({ englishTitle, germanTitle }) => {
  return (
    <div
      className="slide-up-animation standard-timing"
      style={STYLE_CONFIG.TITLE_CONTAINER}
    >
      <h1 className="title-question language-title">
        {processTextWithHTML(englishTitle)}
      </h1>
      <h2 className="title-question language-subtitle">
        {processTextWithHTML(germanTitle)}
      </h2>
    </div>
  );
};

export default LanguageTitle;
