import { processTextWithHTML } from '../../utils/textProcessor';

const StartScreenTitle = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  titleStyle, 
  subtitleStyle,
  showOnlyTitle = false,
  showOnlySubtitle = false
}) => {
  const showTitle = showOnlyTitle || (!showOnlyTitle && !showOnlySubtitle);
  const showSubtitle = showOnlySubtitle || (!showOnlyTitle && !showOnlySubtitle);

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      {showTitle && (
        <h1
          className="typography-head"
        >
          {processTextWithHTML(startContent?.title || defaultTexts.title)}
        </h1>
      )}

      {showSubtitle && (
        <div className="w-full flex justify-center">
          <h2
            className="typography-subline"
            style={{
              ...subtitleStyle,
              width: '98%',
              color: startContent?.subtitleColor || 'var(--color-blassgruen)'
            }}
          >
            {processTextWithHTML(startContent?.subtitle || defaultTexts.subtitle)}
          </h2>
        </div>
      )}
    </div>
  );
};

export default StartScreenTitle;
