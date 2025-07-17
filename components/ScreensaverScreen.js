import { motion } from 'framer-motion';
import { useScreensaverScreen } from '../hooks/useScreensaverScreen';
import { useScreensaverScreenStyles } from './ScreensaverScreen/ScreensaverScreenConfig';
import ScreensaverLoading from './ScreensaverScreen/ScreensaverLoading';
import ScreensaverBackground from './ScreensaverScreen/ScreensaverBackground';
import ScreensaverTitle from './ScreensaverScreen/ScreensaverTitle';
import ScreensaverTouchIndicator from './ScreensaverScreen/ScreensaverTouchIndicator';

const ScreensaverScreen = () => {
  const {
    isLoading,
    isValidData,
    screensaverContent,
    defaultContent,
    iconConfig,
    handleTouch,
  } = useScreensaverScreen();

  const {
    titleStyle,
    touchIndicatorContainerStyle,
    touchIconBackgroundStyle,
    touchIconStyle,
    touchIconTextStyle,
    videoStyle,
  } = useScreensaverScreenStyles();

  // Show loading state if content is not yet loaded
  if (isLoading) {
    return <ScreensaverLoading titleStyle={titleStyle} />;
  }

  if (!isValidData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleTouch}
      onTouchStart={handleTouch}
    >
      <ScreensaverBackground 
        defaultContent={defaultContent}
        videoStyle={videoStyle}
      />
      
      <ScreensaverTitle 
        screensaverContent={screensaverContent}
        defaultContent={defaultContent}
        titleStyle={titleStyle}
      />

      <ScreensaverTouchIndicator 
        iconConfig={iconConfig}
        touchIndicatorContainerStyle={touchIndicatorContainerStyle}
        touchIconBackgroundStyle={touchIconBackgroundStyle}
        touchIconStyle={touchIconStyle}
        touchIconTextStyle={touchIconTextStyle}
      />
    </motion.div>
  );
};

export default ScreensaverScreen;
