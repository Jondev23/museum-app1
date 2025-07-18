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
          ...containerStyle,
          paddingTop: 'min(8.5rem, 11vw)' // Aumentamos más el padding para mover el contenido aún más abajo
        }}
      >
        {/* Main Card Container */}
        <div 
          className="w-full bg-transparent flex items-start justify-center"
          style={{
            ...mainCardStyle,
            flex: 'none' // Eliminamos el flex auto que podría estar causando el espaciado
          }}
        >
          <div style={{ padding: '0' }}>
            <div 
              className="flex flex-col items-center"
              style={{
                ...contentSectionStyle,
                gap: 'min(3.5rem, 5.6vw)' // Aumentamos el gap para más espacio entre subtítulo y descripción
              }}
            >
              {/* Title Section */}
              <StartScreenTitle
                startContent={startContent}
                defaultTexts={defaultTexts}
                showContent={showContent}
                titleStyle={{
                  ...titleStyle,
                  fontSize: 'min(4.32rem, 8.1vw, 9.9vh)', // 10% más pequeño que min(4.8rem, 9vw, 11vh)
                  lineHeight: 'min(4.86rem, 9.72vw, 11.16vh)' // 10% más pequeño que min(5.4rem, 10.8vw, 12.4vh)
                }}
                subtitleStyle={{
                  ...subtitleStyle,
                  fontSize: 'min(2.52rem, 5.04vw, 6.3vh)', // 10% más pequeño que min(2.8rem, 5.6vw, 7vh)
                  lineHeight: 'min(3.024rem, 6.048vw, 7.56vh)' // 10% más pequeño que min(3.36rem, 6.72vw, 8.4vh)
                }}
              />

              {/* Description Section */}
              <StartScreenDescription
                startContent={startContent}
                defaultTexts={defaultTexts}
                showContent={showContent}
                descriptionContainerStyle={{
                  ...descriptionContainerStyle,
                  paddingLeft: 'min(6rem, 12vw)',
                  paddingRight: 'min(6rem, 12vw)'
                }}
                highlightTextStyle={{
                  ...highlightTextStyle,
                  fontSize: 'min(1.3851rem, 2.7702vw, 3.4992vh)', // 10% más pequeño que min(1.539rem, 3.078vw, 3.888vh)
                  lineHeight: 'min(1.93914rem, 3.87828vw, 4.8843vh)', // 10% más pequeño que min(2.1546rem, 4.3092vw, 5.427vh)
                  letterSpacing: 'min(0.013851rem, 0.027702vw, 0.034992vh)' // 10% más pequeño que min(0.01539rem, 0.03078vw, 0.03888vh)
                }}
                introTextStyle={{
                  ...introTextStyle,
                  fontSize: 'min(1.1664rem, 2.4786vw, 3.0618vh)', // 10% más pequeño que min(1.296rem, 2.754vw, 3.402vh)
                  lineHeight: 'min(1.73502rem, 3.47004vw, 4.3011vh)', // 10% más pequeño que min(1.9278rem, 3.8556vw, 4.779vh)
                  letterSpacing: 'min(0.012393rem, 0.024786vw, 0.030618vh)' // 10% más pequeño que min(0.01377rem, 0.02754vw, 0.03402vh)
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
