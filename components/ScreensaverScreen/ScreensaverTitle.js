import { processTextWithHTML } from '../../utils/textProcessor';

// Title component for screensaver
const ScreensaverTitle = ({ screensaverContent, defaultContent, titleStyle }) => (
  <div
    className="flex-1 flex items-center justify-center relative z-20"
  >
    <h1
      className="text-center leading-tight font-tisa-pro"
      style={titleStyle}
    >
      {processTextWithHTML(screensaverContent?.title || defaultContent.title)}
    </h1>
  </div>
);

export default ScreensaverTitle;
