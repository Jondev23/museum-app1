import { motion } from 'framer-motion';
import { START_SCREEN_CONFIG } from './StartScreenConfig';

const StartScreenTitle = ({ 
  startContent, 
  defaultTexts, 
  showContent, 
  titleStyle, 
  subtitleStyle,
  showOnlyTitle = false,
  showOnlySubtitle = false
}) => {
  // Si no se especifica qué mostrar, mostrar ambos (comportamiento por defecto)
  const showTitle = showOnlyTitle || (!showOnlyTitle && !showOnlySubtitle);
  const showSubtitle = showOnlySubtitle || (!showOnlyTitle && !showOnlySubtitle);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Main title */}
      {showTitle && (
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={showContent ? { y: 0, opacity: 1 } : {}}
          transition={{ 
            duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
            delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.TITLE 
          }}
          className="typography-head text-primary"
          style={{
            ...titleStyle,
            color: 'var(--color-text-primary)'
          }}
        >
          {startContent?.title || defaultTexts.title}
        </motion.h1>
      )}

      {/* Subtitle - en su propio contenedor */}
      {showSubtitle && (
        <div className="w-full flex justify-center">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={showContent ? { y: 0, opacity: 1 } : {}}
            transition={{ 
              duration: START_SCREEN_CONFIG.ANIMATION_DURATIONS.CONTENT_FADE, 
              delay: START_SCREEN_CONFIG.ANIMATION_DELAYS.SUBTITLE 
            }}
            className="typography-subline"
            style={{
              ...subtitleStyle,
              width: '98%',
              color: 'var(--color-blassgruen)'
            }}
          >
            {startContent?.subtitle || defaultTexts.subtitle}
          </motion.h2>
        </div>
      )}
    </div>
  );
};

export default StartScreenTitle;
