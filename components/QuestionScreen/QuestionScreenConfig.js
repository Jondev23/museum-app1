import { useMemo, useCallback } from 'react';

// Constantes de configuración
export const QUESTION_CONFIG = {
  TOTAL_QUESTIONS: 5,
  ANSWER_DELAY: 500,
  ANIMATION_DELAYS: {
    TITLE: 0.2,
    BUTTONS: 0.4,
    BUTTON_STAGGER: 0.1,
    BUTTON_BASE: 0.6,
  },
  ANIMATION_DURATIONS: {
    SCREEN_TRANSITION: 0.2,
    TITLE: 0.6,
    BUTTONS: 0.6,
    BUTTON_INDIVIDUAL: 0.4,
  },
};

// Hook para estilos memoizados - Solo mantiene estilos dinámicos y background
export const useQuestionScreenStyles = (startContent) => {
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url(${startContent?.backgroundImage || '/images/Bild_Kutsche.webp'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }), [startContent?.backgroundImage]);

  const progressDotsStyle = useMemo(() => ({
    left: '50%',
    bottom: 'min(5.625rem, 9vh)',
    transform: 'translateX(-50%)',
    zIndex: 30
  }), []);

  return {
    backgroundStyle,
    progressDotsStyle
  };
};
