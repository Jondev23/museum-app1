import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

// Loading screen component for screensaver state - no text needed
const ScreensaverLoading = () => (
  <div
    className={`fixed inset-0 ${SCREENSAVER_CONFIG.COLORS.LOADING_BG} flex flex-col items-center justify-center cursor-pointer`}
  >
    {/* Simple loading screen without text */}
  </div>
);

export default ScreensaverLoading;
