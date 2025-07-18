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
        style={{
          ...containerStyle
        }}
      >
        {/* Main Card Container */}
        <div 
          className="w-full bg-transparent flex items-start justify-center"
          style={{
            ...mainCardStyle,
            flex: 'none' 
          }}
        >
          <div style={{}}>
            <div 
              className="flex flex-col items-center"
              style={{
                ...contentSectionStyle,
                gap: '0' 
              }}
            >
              {/* Title Section */}
              <StartScreenTitle
                startContent={startContent}
                defaultTexts={defaultTexts}
                showContent={showContent}
                titleStyle={{
                  ...titleStyle,
                  fontSize: 'min(8.1vw, 4.32rem)', 
                  lineHeight: 'min(9.72vw, 4.86rem)',
                  height: '10vh',
                  maxHeight: '20vh'
                }}
                showOnlyTitle={true}
              />

              {/* Subtitle Section */}
              <StartScreenTitle
                startContent={startContent}
                defaultTexts={defaultTexts}
                showContent={showContent}
                subtitleStyle={{
                  ...subtitleStyle,
                  fontSize: 'min(5.04vw, 2.52rem)', 
                  lineHeight: 'min(6.048vw, 3.024rem)',
                  height: '10vh',
                  maxHeight: '20vh'
                }}
                showOnlySubtitle={true}
              />

              {/* Description Section */}
              <StartScreenDescription
                startContent={startContent}
                defaultTexts={defaultTexts}
                showContent={showContent}
                descriptionContainerStyle={{
                  ...descriptionContainerStyle,
                  height: '40vh',
                  maxHeight: '40vh'
                }}
                highlightTextStyle={{
                  ...highlightTextStyle,
                  fontSize: 'min(2.7702vw, 1.3851rem)', 
                  lineHeight: 'min(3.87828vw, 1.93914rem)', 
                  letterSpacing: 'min(0.027702vw, 0.013851rem)' 
                }}
                introTextStyle={{
                  ...introTextStyle,
                  fontSize: 'min(2.4786vw, 1.1664rem)', 
                  lineHeight: 'min(3.47004vw, 1.73502rem)', 
                  letterSpacing: 'min(0.024786vw, 0.012393rem)' 
                }}
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
              ...touchIndicatorContainerStyle
            }}
            touchIndicatorStyle={touchIndicatorStyle}
          />
        </StandardFooter>
      </div>
    </motion.div>
  );
};

export default StartScreen;
