// Ejemplo de integración de las animaciones JavaScript ultra suaves
// Este archivo muestra cómo reemplazar las animaciones CSS por las de JS

import { useApp } from '../context/AppContext';
import { useState, useEffect, useRef } from 'react';
import { useSmoothAnimations, useScreenTransitions } from '../hooks/useSmoothAnimations';
import SmoothScreenWrapper from '../components/SmoothScreenWrapper';

// Import all screen components
import ScreensaverScreen from '../components/ScreensaverScreen';
import StartScreen from '../components/StartScreen';
import QuestionScreen from '../components/QuestionScreen';
import FeedbackScreen from '../components/FeedbackScreen';
import ResultsScreen from '../components/ResultsScreen';
import LanguageSelector from '../components/LanguageSelector';
import LanguageSelectorIcon from '../components/shared/LanguageSelectorIcon';
import ProgressDots from '../components/shared/ProgressDots';
import GlobalBackground from '../components/shared/GlobalBackground';
import AdminPanel from '../components/AdminPanel';

// Main application component with JavaScript animations
export default function HomeWithSmoothAnimations() {
  // Get current screen state from app context
  const { 
    currentScreen, 
    currentQuestionIndex, 
    answers, 
    questions,
    content,
    language,
    kioskId
  } = useApp();

  // State for managing screen transitions
  const [displayedScreen, setDisplayedScreen] = useState(currentScreen);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(currentQuestionIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Referencias para las transiciones
  const currentScreenRef = useRef(null);
  const nextScreenRef = useRef(null);
  const { transitionManager } = useSmoothAnimations();

  // Handle screen transitions with smooth JavaScript animations
  useEffect(() => {
    if (currentScreen !== displayedScreen && !isTransitioning) {
      performScreenTransition();
    }
  }, [currentScreen, displayedScreen, isTransitioning, currentQuestionIndex]);

  const performScreenTransition = async () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    try {
      // Determinar tipo de transición basado en las pantallas
      const transitionType = getTransitionType(displayedScreen, currentScreen);
      
      // Preparar el contenido de la siguiente pantalla
      const nextScreenContent = renderScreenContent(currentScreen, currentQuestionIndex);
      
      // Crear elementos temporales para la transición
      if (nextScreenRef.current) {
        nextScreenRef.current.innerHTML = '';
        nextScreenRef.current.appendChild(nextScreenContent);
      }
      
      // Ejecutar la transición suave
      await transitionManager.transitionToScreen(
        currentScreenRef.current,
        nextScreenRef.current,
        transitionType
      );
      
      // Actualizar el estado después de la transición
      setDisplayedScreen(currentScreen);
      setDisplayedQuestionIndex(currentQuestionIndex);
      
      // Intercambiar referencias
      const temp = currentScreenRef.current;
      currentScreenRef.current = nextScreenRef.current;
      nextScreenRef.current = temp;
      
    } catch (error) {
      console.error('Error en transición de pantalla:', error);
      // Fallback: cambio inmediato
      setDisplayedScreen(currentScreen);
      setDisplayedQuestionIndex(currentQuestionIndex);
    } finally {
      setIsTransitioning(false);
    }
  };

  // Determinar el tipo de transición basado en las pantallas
  const getTransitionType = (fromScreen, toScreen) => {
    // Screensaver siempre usa fade
    if (fromScreen === 'screensaver' || toScreen === 'screensaver') {
      return 'screensaver';
    }
    
    // Feedback usa transición especial
    if (fromScreen === 'feedback' || toScreen === 'feedback') {
      return 'feedback';
    }
    
    // Question screen usa fade out
    if (fromScreen === 'question') {
      return 'fade';
    }
    
    // Por defecto, slide
    return 'slide';
  };

  // Renderizar contenido de pantalla como elemento DOM
  const renderScreenContent = (screenType, questionIndex = 0) => {
    const container = document.createElement('div');
    container.className = 'w-full h-full';
    
    // Aquí deberías renderizar el contenido real de React
    // Esta es una versión simplificada para el ejemplo
    switch (screenType) {
      case 'screensaver':
        container.innerHTML = '<div class="screensaver-content">Screensaver</div>';
        break;
      case 'start':
        container.innerHTML = '<div class="start-content">Start Screen</div>';
        break;
      case 'question':
        container.innerHTML = `<div class="question-content">Question ${questionIndex + 1}</div>`;
        break;
      case 'feedback':
        container.innerHTML = '<div class="feedback-content">Feedback</div>';
        break;
      case 'results':
        container.innerHTML = '<div class="results-content">Results</div>';
        break;
      default:
        container.innerHTML = '<div class="default-content">Default</div>';
    }
    
    return container;
  };

  // Show loading screen if kioskId is not yet determined
  if (!kioskId) {
    return (
      <SmoothScreenWrapper animationType="fadeIn" className="w-screen h-screen overflow-hidden bg-black">
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-center">
            <div className="text-2xl mb-4">Initialisiere Kiosk...</div>
            <div className="rounded-full h-12 w-12 border-b-2 border-white mx-auto animate-spin"></div>
          </div>
        </div>
      </SmoothScreenWrapper>
    );
  }

  // Render different screens based on displayed state
  const renderScreen = () => {
    switch (displayedScreen) {
      case 'screensaver':
        return (
          <SmoothScreenWrapper 
            animationType="screensaverEnter" 
            duration={3000}
            key="screensaver"
          >
            <ScreensaverScreen />
          </SmoothScreenWrapper>
        );
      case 'start':
        return (
          <SmoothScreenWrapper 
            animationType="slideInFromRight" 
            key="start"
          >
            <StartScreen />
          </SmoothScreenWrapper>
        );
      case 'question':
        return (
          <SmoothScreenWrapper 
            animationType="slideInFromRight" 
            key={`question-${displayedQuestionIndex}`}
          >
            <QuestionScreen />
          </SmoothScreenWrapper>
        );
      case 'feedback':
        return (
          <SmoothScreenWrapper 
            animationType="fadeIn" 
            key={`feedback-${displayedQuestionIndex}`}
          >
            <FeedbackScreen />
          </SmoothScreenWrapper>
        );
      case 'results':
        return (
          <SmoothScreenWrapper 
            animationType="slideInFromRight" 
            key="results"
          >
            <ResultsScreen />
          </SmoothScreenWrapper>
        );
      default:
        return (
          <SmoothScreenWrapper 
            animationType="screensaverEnter" 
            key="screensaver"
          >
            <ScreensaverScreen />
          </SmoothScreenWrapper>
        );
    }
  };

  // Get background image from current kiosk configuration
  const startContent = content?.[language]?.startScreen;
  const globalBackgroundImage = startContent?.backgroundImage;

  return (
    // Main container - fullscreen with black background
    <div className="w-screen h-screen overflow-hidden bg-black hw-accelerated">
      {/* Global Background - static across all screens */}
      <div className="fixed inset-0 z-5">
        <GlobalBackground backgroundImage={globalBackgroundImage} />
      </div>

      {/* Main content area with smooth transitions */}
      <div className="fixed inset-0 z-10">
        <div className="screen-container transition-active">
          {/* Referencias ocultas para transiciones */}
          <div ref={currentScreenRef} className="absolute inset-0" />
          <div ref={nextScreenRef} className="absolute inset-0" style={{ display: 'none' }} />
          
          {/* Contenido actual */}
          <div className={`absolute inset-0 ${isTransitioning ? 'screen-transitioning' : ''}`}>
            {renderScreen()}
          </div>
        </div>
      </div>

      {/* Language selector - always visible */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelectorIcon />
      </div>

      {/* Progress dots - visible on question screens */}
      {(displayedScreen === 'question' || displayedScreen === 'feedback') && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <ProgressDots 
            total={questions?.length || 0}
            current={displayedQuestionIndex}
          />
        </div>
      )}

      {/* Language Selector Modal */}
      <LanguageSelector />

      {/* Admin Panel */}
      <AdminPanel />
    </div>
  );
}
