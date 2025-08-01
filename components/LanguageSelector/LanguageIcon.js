import { DEFAULT_CONTENT } from './LanguageSelectorConfig';

// Language selection icon component with CSS animation
const LanguageIcon = () => {
  return (
    <div
      className="flex items-center justify-center slide-up-animation standard-timing"
    >
      <img 
        src={DEFAULT_CONTENT.iconSrc}
        alt={DEFAULT_CONTENT.iconAlt}
        className="language-icon"
      />
    </div>
  );
};

export default LanguageIcon;
