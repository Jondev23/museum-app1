import { SCREENSAVER_CONFIG } from './ScreensaverScreenConfig';

// Touch indicator component for screensaver
const ScreensaverTouchIndicator = ({ 
  touchIndicatorContainerStyle,
  touchIconBackgroundStyle,
  touchIconStyle,
  touchIconTextStyle 
}) => (
  <div
    style={touchIndicatorContainerStyle}
    className="relative z-20"
  >
    <div
      className="relative"
    >
      {/* Touch indicator circle */}
      <div 
        className={`relative z-10 flex items-center justify-center rounded-full ${SCREENSAVER_CONFIG.COLORS.TOUCH_BACKGROUND} backdrop-blur-sm border ${SCREENSAVER_CONFIG.COLORS.TOUCH_BORDER}`}
        style={touchIconBackgroundStyle}
      >
      </div>
    </div>
  </div>
);

export default ScreensaverTouchIndicator;
