import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';
import { useStartScreen } from '../hooks/useStartScreen';
import { useStartScreenStyles, START_SCREEN_CONFIG } from './StartScreen/StartScreenConfig';
import StartScreenTitle from './StartScreen/StartScreenTitle';
import StartScreenDescription from './StartScreen/StartScreenDescription';
import StartScreenTouchIndicator from './StartScreen/StartScreenTouchIndicator';

const StartScreen = () => {
  const {
    showContent,
    startContent,
    defaultTexts,
    isValidData,
    handleSwipeLeft,
    handleTouchStart,
  } = useStartScreen();

  const {
    backgroundStyle,
    containerStyle,
    mainCardStyle,
    titleSectionStyle,
    contentSectionStyle,
    titleStyle,
    subtitleStyle,
    descriptionContainerStyle,
    highlightTextStyle,
    introTextStyle,
    touchIndicatorContainerStyle,
    touchIndicatorStyle
  } = useStartScreenStyles(startContent);

  if (!isValidData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: '-100%' }}
      transition={{ duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.SCREEN_TRANSITION }}
      className="fixed inset-0 overflow-hidden"
      onTouchStart={handleTouchStart}
      style={backgroundStyle}
    >
      {/* Black overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div 
        className="relative z-10 h-full flex flex-col items-center w-full"
        style={containerStyle}
      >
        {/* Main Card Container */}
        <div 
          className="w-full bg-transparent flex items-center justify-center"
          style={mainCardStyle}
        >
          <div style={{ padding: '0' }}>
            <div 
              className="flex flex-col items-center"
              style={contentSectionStyle}
            >
              {/* Title Section */}
              <StartScreenTitle
                startContent={startContent}
                defaultTexts={defaultTexts}
                showContent={showContent}
                titleStyle={titleStyle}
                subtitleStyle={subtitleStyle}
              />

              {/* Description Section */}
              <StartScreenDescription
                startContent={startContent}
                defaultTexts={defaultTexts}
                showContent={showContent}
                descriptionContainerStyle={descriptionContainerStyle}
                highlightTextStyle={highlightTextStyle}
                introTextStyle={introTextStyle}
              />
            </div>
          </div>
        </div>

        {/* Footer with language icon and swipe indicator */}
        <StandardFooter>
          <StartScreenTouchIndicator
            showContent={showContent}
            handleSwipeLeft={handleSwipeLeft}
            touchIndicatorContainerStyle={{
              ...touchIndicatorContainerStyle,
              bottom: 'min(1.0rem, 2vh)' // Un poco más abajo
            }}
            touchIndicatorStyle={touchIndicatorStyle}
          />
        </StandardFooter>
      </div>
    </motion.div>
  );
};

export default StartScreen;
