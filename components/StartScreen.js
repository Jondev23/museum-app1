// Import componentes
import StandardFooter from './shared/StandardFooter';
import { useState, useEffect } from 'react';

// Import hooks y configuración
import { useStartScreen } from '../hooks/useStartScreen';
import { useStartScreenStyles } from './StartScreen/StartScreenConfig';

// Subcomponentes
import StartScreenTitle from './StartScreen/StartScreenTitle';
import StartScreenDescription from './StartScreen/StartScreenDescription';
import StartScreenTouchIndicator from './StartScreen/StartScreenTouchIndicator';

// Start screen component - first screen after screensaver
const StartScreen = () => {
  const [titleMarginTop, setTitleMarginTop] = useState('12rem');

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setTitleMarginTop(window.innerHeight < 900 ? '10rem' : '12rem');
      }
    };

    // Ejecutar al montar el componente
    handleResize();
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);
    
    // Limpiar el event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    showContent,
    startContent,
    defaultTexts,
    isValidData,
    handleTouchStart,
    handleClick,
  } = useStartScreen();

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
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
        <div 
          className="relative z-10 h-full flex flex-col items-center w-full px-4 sm:px-6 md:px-8 start-screen-container"
          style={containerStyle}
        >
          <div 
            className="w-full max-w-7xl bg-transparent flex items-start justify-center flex-grow"
            style={mainCardStyle}
          >
            <div className="w-full">
              <div 
                className="flex flex-col items-center h-full"
                style={contentSectionStyle}
              >
                {/* Título */}
                <div 
                  className="w-full flex flex-col items-center justify-center flex-shrink-0"
                  style={{
                    marginTop: titleMarginTop
                  }}
                >
                  <StartScreenTitle
                    startContent={startContent}
                    defaultTexts={defaultTexts}
                    showContent={showContent}
                    titleStyle={titleStyle}
                    subtitleStyle={subtitleStyle}
                  />
                </div>

                {/* Descripción */}
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
      </div>

      {/* Footer sin animación */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
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
      </div>
    </>
  );
};

export default StartScreen;
