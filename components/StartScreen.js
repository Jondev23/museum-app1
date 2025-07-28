// Import animation library and screen components
import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';

// Import custom hooks and configuration
import { useStartScreen } from '../hooks/useStartScreen';
import { useStartScreenStyles, START_SCREEN_CONFIG } from './StartScreen/StartScreenConfig';

// Import subcomponents
import StartScreenTitle from './StartScreen/StartScreenTitle';
import StartScreenDescription from './StartScreen/StartScreenDescription';
import StartScreenTouchIndicator from './StartScreen/StartScreenTouchIndicator';

// Start screen component - first screen after screensaver
const StartScreen = () => {
  // Get screen data and handlers from custom hook
  const {
    showContent,
    startContent,
    defaultTexts,
    isValidData,
    handleTouchStart,
    handleClick,
  } = useStartScreen();

  // Get dynamic styles based on content
  const {
    containerStyle,
    mainCardStyle,
    contentSectionStyle,
    descriptionSectionStyle,
    titleStyle,
    subtitleStyle,
    descriptionContainerStyle,
    highlightTextStyle,
    introTextStyle,
    touchIndicatorContainerStyle,
    touchIndicatorStyle
  } = useStartScreenStyles(startContent);

  // Don't render if data is invalid
  if (!isValidData) return null;

  return (
    <>
      {/* Animated content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ x: '-100%' }}
        transition={{ duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.SCREEN_TRANSITION }}
        className="fixed inset-0 overflow-hidden cursor-pointer z-20"
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
        {/* Content */}
        <div 
          className="relative z-10 h-full flex flex-col items-center w-full px-4 sm:px-6 md:px-8"
          style={containerStyle}
        >
          {/* Main Card Container */}
          <div 
            className="w-full max-w-7xl bg-transparent flex items-start justify-center flex-grow"
            style={mainCardStyle}
          >
            <div className="w-full">
              <div 
                className="flex flex-col items-center h-full"
                style={contentSectionStyle}
              >
                {/* Title and Subtitle Section */}
                <div className="w-full flex flex-col items-center justify-center flex-shrink-0">
                  <StartScreenTitle
                    startContent={startContent}
                    defaultTexts={defaultTexts}
                    showContent={showContent}
                    titleStyle={titleStyle}
                    subtitleStyle={subtitleStyle}
                  />
                </div>

                {/* Description Section */}
                <div className="flex-grow flex items-center justify-center w-full" style={descriptionSectionStyle}>
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
          </div>
        </div>
      </motion.div>

      {/* Footer section - separated with independent animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.4, // Entry duration
          exit: { duration: 0.2, delay: 0.15 } // Delayed exit to overlap with next screen footer
        }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <StandardFooter>
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center" 
               style={{ 
                 top: 'clamp(-120px, -15vh, -100px)'
               }}>
            <StartScreenTouchIndicator
              showContent={showContent}
              handleSwipeLeft={handleClick}
              touchIndicatorContainerStyle={touchIndicatorContainerStyle}
              touchIndicatorStyle={touchIndicatorStyle}
            />
          </div>
        </StandardFooter>
      </motion.div>
    </>
  );
};

export default StartScreen;
