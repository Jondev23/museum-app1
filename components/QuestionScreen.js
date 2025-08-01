// Componente QuestionScreen - Implementación limpia desde cero
import React, { useEffect, useState } from 'react';

// Importar hooks y componentes necesarios
import { useQuestionScreen } from '../hooks/useQuestionScreen';
import { useQuestionScreenStyles, QUESTION_CONFIG } from './QuestionScreen/QuestionScreenConfig';
import QuestionTitle from './QuestionScreen/QuestionTitle';
import AnswerButtons from './QuestionScreen/AnswerButtons';
import QuestionFooter from './QuestionScreen/QuestionFooter';

const QuestionScreen = () => {
  // Estado para controlar la animación
  const [animationPhase, setAnimationPhase] = useState('initial');

  // Iniciar animación de entrada cuando el componente se monte
  useEffect(() => {
    // Primero establecer el estado inicial
    setAnimationPhase('initial');
    
    // Forzar un reflow para asegurarse de que la animación funcione correctamente
    if (typeof document !== 'undefined' && document.body) {
      document.body.offsetHeight;
    }
    
    // Iniciar la animación de entrada después de un pequeño delay
    const timer = setTimeout(() => {
      setAnimationPhase('enter');
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Obtener datos y funciones del hook de QuestionScreen
  const {
    question,
    startContent,
    currentQuestionIndex,
    selectedAnswer,
    isValidData,
    answers,
    questions,
    isProcessing,
    handleAnswerClick,
    getButtonClassName,
    getButtonStyle,
    getButtonMotionProps
  } = useQuestionScreen();

  // Obtener estilos dinámicos basados en el contenido
  const {
    progressDotsStyle
  } = useQuestionScreenStyles(startContent);

  // No renderizar si los datos no son válidos
  if (!isValidData) return null;

  // Definir estilos para la animación de entrada
  const containerStyle = {
    position: 'fixed',
    inset: 0, 
    display: 'flex',
    flexDirection: 'column',
    opacity: animationPhase === 'initial' ? 0 : 1,
    transform: animationPhase === 'initial' ? 'translateX(100%)' : 'translateX(0)',
    transition: 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out'
  };

  return (
    <>
      {/* Definir estilos de animación global para el componente */}
      <style>
        {`
          @keyframes slideFromRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideToLeft {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(-100%);
              opacity: 0;
            }
          }
          
          .question-screen-container {
            animation: slideFromRight 0.6s ease-in-out forwards;
          }
          
          .question-screen-exit {
            animation: slideToLeft 0.6s ease-in-out forwards;
          }
        `}
      </style>

      {/* Contenedor principal con animación de derecha a izquierda */}
      <div 
        className="question-screen-container"
        style={containerStyle}
      >
        {/* Contenedor de contenido sin footer */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Contenido principal */}
          <div className="flex flex-col items-center justify-start flex-1 w-full max-w-7xl mx-auto pt-[6.42rem] pb-2 gap-6">
            {/* Contenedor de tarjeta */}
            <div className="flex flex-col items-center w-full mt-[min(3.08rem,4.62vh)] py-[min(0.25rem,0.5vw)] gap-[min(1.5rem,3vw)] rounded-[min(1.875rem,4vw)] overflow-hidden border-0 bg-transparent">
              {/* Contenido */}
              <div className="flex flex-col items-center w-full p-0 gap-[min(3rem,4.5vw)]">
                <QuestionTitle 
                  question={question} 
                />

                <AnswerButtons
                  question={question}
                  handleAnswerClick={handleAnswerClick}
                  selectedAnswer={selectedAnswer}
                  isProcessing={isProcessing}
                  getButtonClassName={getButtonClassName}
                  getButtonStyle={getButtonStyle}
                  getButtonMotionProps={getButtonMotionProps}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de footer - gestionado separadamente */}
      <div className="fixed bottom-0 left-0 right-0" style={{ zIndex: 50 }}>
        <QuestionFooter />
      </div>
    </>
  );
};

export default QuestionScreen;
