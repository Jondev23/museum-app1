// Import componentes y GSAP
import StandardFooter from './shared/StandardFooter';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Import hooks y configuración  
import { useStartScreen } from '../hooks/useStartScreen';
import { useStartScreenStyles } from './StartScreen/StartScreenConfig';

// Subcomponentes
import StartScreenTitle from './StartScreen/StartScreenTitle';
import StartScreenDescription from './StartScreen/StartScreenDescription';
import StartScreenTouchIndicator from './StartScreen/StartScreenTouchIndicator';

// Start screen component - first screen after screensaver
const StartScreen = () => {
  const [screenPaddingTop, setScreenPaddingTop] = useState('12rem');
  
  // Referencias para animaciones GSAP
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const touchIndicatorRef = useRef(null);
  const mainCardRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setScreenPaddingTop(window.innerHeight < 900 ? '10rem' : '12rem');
      }
    };

    // Ejecutar al montar el componente
    handleResize();
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);
    
    // Limpiar el event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animaciones de entrada cuando el componente se monta
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Establecer estados iniciales
    gsap.set([titleRef.current, descriptionRef.current, touchIndicatorRef.current], {
      opacity: 0,
      y: 50
    });
    
    gsap.set(mainCardRef.current, {
      opacity: 0,
      scale: 0.95
    });

    // Animar entrada secuencial
    tl.to(mainCardRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(touchIndicatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

    // Animación pulsante para el indicador de toque
    gsap.to(touchIndicatorRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1
    });

  }, []);

  const {
    showContent,
    startContent,
    defaultTexts,
    isValidData,
    handleTouchStart,
    handleClick,
  } = useStartScreen();

  // Función para manejar la animación de salida
  const handleExitAnimation = () => {
    // Detener la animación pulsante
    gsap.killTweensOf(touchIndicatorRef.current);
    
    // Fade out del indicador de toque
    gsap.to(touchIndicatorRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Handlers modificados para incluir animación de salida
  const handleTouchStartWithAnimation = (e) => {
    handleExitAnimation();
    setTimeout(() => handleTouchStart(e), 300);
  };

  const handleClickWithAnimation = (e) => {
    handleExitAnimation();
    setTimeout(() => handleClick(e), 300);
  };

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

  if (!isValidData) return null;

  return (
    <>
      {/* Contenedor principal sin animación */}
      <div
        className="fixed inset-0 overflow-hidden cursor-pointer z-20"
        onTouchStart={handleTouchStartWithAnimation}
        onClick={handleClickWithAnimation}
      >
        <div 
          className="relative z-10 h-full flex flex-col items-center w-full px-4 sm:px-6 md:px-8 start-screen-container"
          style={{
            ...containerStyle,
            paddingTop: screenPaddingTop
          }}
        >
          <div 
            ref={mainCardRef}
            className="w-full max-w-7xl bg-transparent flex items-start justify-center flex-grow"
            style={mainCardStyle}
          >
            <div className="w-full">
              <div 
                className="flex flex-col items-center h-full"
                style={contentSectionStyle}
              >
                {/* Título */}
                <div ref={titleRef} className="w-full flex flex-col items-center justify-center flex-shrink-0">
                  <StartScreenTitle
                    startContent={startContent}
                    defaultTexts={defaultTexts}
                    showContent={showContent}
                    titleStyle={titleStyle}
                    subtitleStyle={subtitleStyle}
                  />
                </div>

                {/* Descripción */}
                <div ref={descriptionRef} className="flex-grow flex items-center justify-center w-full" style={descriptionSectionStyle}>
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
      </div>

      {/* Footer sin animación */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <StandardFooter>
          <div ref={touchIndicatorRef} className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center" 
               style={{ 
                 bottom: '1.95rem'
               }}>
            <StartScreenTouchIndicator
              showContent={showContent}
              handleSwipeLeft={handleClickWithAnimation}
              touchIndicatorContainerStyle={touchIndicatorContainerStyle}
              touchIndicatorStyle={touchIndicatorStyle}
            />
          </div>
        </StandardFooter>
      </div>
    </>
  );
};

export default StartScreen;
