import { motion } from 'framer-motion';
import StandardFooter from './shared/StandardFooter';
import LanguageSelectorIcon from './shared/LanguageSelectorIcon';
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
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: 'var(--color-overlay)' }}
      />

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

        {/* Language Selector Icon */}
        <LanguageSelectorIcon 
          variant="standard" 
          delay={0.6}
          className=""
          style={{
            position: 'fixed',
            bottom: '1rem', // 5% lower (was 1.5rem)
            left: 'min(3rem, 6vw)', // 10% more to left (was min(5.125rem, 8vw))
            zIndex: 75,
            margin: 0 
          }}
        />

        {/* Standard Footer */}
        <StandardFooter />

        {/* Touch Indicator - positioned relative to footer */}
        <div className="fixed left-1/2 transform -translate-x-1/2 flex justify-center items-center" 
             style={{ 
               bottom: 'calc(min(4.375rem, 7vh) + clamp(10px, 2vh, 20px))',
               zIndex: 70
             }}>
          <StartScreenTouchIndicator
            showContent={showContent}
            handleSwipeLeft={handleSwipeLeft}
            touchIndicatorContainerStyle={touchIndicatorContainerStyle}
            touchIndicatorStyle={touchIndicatorStyle}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StartScreen;
