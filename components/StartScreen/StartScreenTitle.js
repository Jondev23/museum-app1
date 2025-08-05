import { processTextWithHTML } from '../../utils/textProcessor';

const StartScreenTitle = ({ 
  startContent, 
  defaultTexts,
  subtitleStyle
}) => {
  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <h1 className="typography-head">
        {processTextWithHTML(startContent?.title || defaultTexts.title)}
      </h1>

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
    </div>
  );
};

export default StartScreenTitle;
