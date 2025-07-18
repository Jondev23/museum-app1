import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';

const StartScreenTitle = ({ startContent, defaultTexts, showContent, titleStyle, subtitleStyle }) => {
  return (
    <div className="flex flex-col items-center w-full" style={{ gap: 'min(0.0rem, 0vw)' }}>
      {/* Main title */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={showContent ? { y: 0, opacity: 1 } : {}}
        transition={{ 
          duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
          delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.TITLE 
        }}
        className="title-main"
        style={titleStyle}
      >
        {startContent?.title || defaultTexts.title}
      </motion.h1>

      {/* Subtitle - en su propio contenedor */}
      <div className="w-full flex justify-center">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ 
            duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
            delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.SUBTITLE 
          }}
          className="subtitle-main"
          style={{
            ...subtitleStyle,
            width: '98%',
            maxWidth: '100%'
          }}
        >
          {startContent?.subtitle || defaultTexts.subtitle}
        </motion.h2>
      </div>
    </div>
  );
};

export default StartScreenTitle;
