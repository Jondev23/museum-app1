import StandardFooter from './shared/StandardFooter';
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { gsap } from 'gsap';

import { useStartScreen } from '../hooks/useStartScreen';
import { useStartScreenStyles } from './StartScreen/StartScreenConfig';

// Subcomponentes
import StartScreenTitle from './StartScreen/StartScreenTitle';
import StartScreenDescription from './StartScreen/StartScreenDescription';
import StartScreenTouchIndicator from './StartScreen/StartScreenTouchIndicator';

// Start screen component - first screen after screensaver
const StartScreen = () => {
  const [screenPaddingTop, setScreenPaddingTop] = useState('12rem');
  
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

    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([titleRef.current, descriptionRef.current, touchIndicatorRef.current], {
      opacity: 0,
      y: 50
    });
    
    gsap.set(mainCardRef.current, {
      opacity: 0,
      scale: 0.95
    });

    tl.to(mainCardRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6, 
      ease: "power2.out"
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.25")
    .to(touchIndicatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.15");

    gsap.to(touchIndicatorRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 0.8
    });

  }, []);

  const {
    startContent,
    defaultTexts,
    isValidData,
    handleTouchStart,
    handleClick,
  } = useStartScreen();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExitAnimation = () => {
    gsap.killTweensOf(touchIndicatorRef.current);
    
    gsap.to(touchIndicatorRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleNavigation = useCallback((e) => {
    if (isTransitioning) return;
    
    e?.preventDefault?.();
    e?.stopPropagation?.();
    
    setIsTransitioning(true);
    handleExitAnimation();
    
    setTimeout(() => {
      handleClick();
    }, 150);
  }, [isTransitioning, handleClick]);

  const handleTouchStartWithAnimation = useCallback((e) => {
    handleNavigation(e);
  }, [handleNavigation]);

  const handleClickWithAnimation = useCallback((e) => {
    handleNavigation(e);
  }, [handleNavigation]);

  const {
    containerStyle,
    mainCardStyle,
    contentSectionStyle,
    descriptionSectionStyle,
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
      <div
        className="fixed inset-0 overflow-hidden cursor-pointer z-20"
        onTouchStart={handleTouchStartWithAnimation}
        onClick={handleClickWithAnimation}
        style={{ touchAction: 'manipulation' }}
      >
        <div 
          className="relative z-10 h-full flex flex-col items-center w-full start-screen-container"
          style={{
            ...containerStyle,
            paddingTop: screenPaddingTop
          }}
        >
          <div 
            ref={mainCardRef}
            className="w-full bg-transparent flex items-start justify-center flex-grow"
            style={mainCardStyle}
          >
            <div className="w-full">
              <div 
                className="flex flex-col items-center h-full"
                style={contentSectionStyle}
              >
                <div ref={titleRef} className="w-full flex flex-col items-center justify-center flex-shrink-0">
                  <StartScreenTitle
                    startContent={startContent}
                    defaultTexts={defaultTexts}
                    subtitleStyle={subtitleStyle}
                  />
                </div>

                <div ref={descriptionRef} className="w-full flex items-start justify-center" style={descriptionSectionStyle}>
                  <StartScreenDescription
                    startContent={startContent}
                    defaultTexts={defaultTexts}
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

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <StandardFooter>
          <div 
            ref={touchIndicatorRef} 
            className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center cursor-pointer" 
            style={{ 
              bottom: '1.95rem',
              width: 'var(--touch-indicator-size)',
              height: 'var(--touch-indicator-size)'
            }}
            onTouchStart={handleTouchStartWithAnimation}
            onClick={handleClickWithAnimation}
          >
            <StartScreenTouchIndicator
              touchIndicatorContainerStyle={touchIndicatorContainerStyle}
              touchIndicatorStyle={touchIndicatorStyle}
            />
          </div>
        </StandardFooter>
      </div>
    </>
  );
};

export default memo(StartScreen);
