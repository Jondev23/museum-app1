import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

// Loading screen component for screensaver state
const ScreensaverLoading = ({ titleStyle }) => (
  <div
    className={`fixed inset-0 ${SCREENSAVER_CONFIG.COLORS.LOADING_BG} flex flex-col items-center justify-center cursor-pointer`}
  >
    <h1
      className="text-center leading-tight font-tisa-pro"
      style={titleStyle}
    >
      {/* Loading text */}
      Loading...
    </h1>
  </div>
);

export default ScreensaverLoading;
