import { DEFAULT_CONTENT } from './LanguageSelectorConfig';

// Language selection icon component
const LanguageIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <img 
        src={DEFAULT_CONTENT.iconSrc}
        alt={DEFAULT_CONTENT.iconAlt}
        className="language-icon"
      />
    </div>
  );
};

export default LanguageIcon;
