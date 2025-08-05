import { processTextWithHTML } from '../../utils/textProcessor';
import { STYLE_CONFIG } from './LanguageSelectorConfig';

// Title component for language selector with bilingual text
const LanguageTitle = ({ englishTitle, germanTitle }) => {
  return (
    <div style={STYLE_CONFIG.TITLE_CONTAINER}>
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
