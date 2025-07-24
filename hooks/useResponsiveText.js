import { useEffect, useRef, useState } from 'react';

/**

 * @param {Object} initialStyle 
 * @param {string} content 
 * @param {Object} options 
 * @param {number} options.minScale 
 * @param {number} options.step 
 * @param {number} options.delay 
 * @returns {Object} { ref, adjustedStyle, isAdjusted }
 */
export const useResponsiveText = (initialStyle, content, options = {}) => {
  const {
    minScale = 0.5,
    step = 1,
    delay = 150
  } = options;

  const [adjustedStyle, setAdjustedStyle] = useState(initialStyle);
  const [isAdjusted, setIsAdjusted] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current && content) {
      const element = textRef.current;
      
      const adjustTextSize = () => {
        element.style.fontSize = initialStyle.fontSize;
        element.style.lineHeight = initialStyle.lineHeight;
        
        const containerHeight = element.offsetHeight;
        const containerWidth = element.offsetWidth;
        
        let currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        const minSize = currentSize * minScale;
        let wasAdjusted = false;
        
        while ((element.scrollHeight > containerHeight || element.scrollWidth > containerWidth) && currentSize > minSize) {
          currentSize -= step;
          element.style.fontSize = `${currentSize}px`;
          element.style.lineHeight = `${currentSize * 1.25}px`;
          wasAdjusted = true;
        }
        
        setAdjustedStyle({
          ...initialStyle,
          fontSize: `${currentSize}px`,
          lineHeight: `${currentSize * 1.25}px`
        });
        
        setIsAdjusted(wasAdjusted);
      };

      const timer = setTimeout(adjustTextSize, delay);
      
      const handleResize = () => {
        clearTimeout(timer);
        setTimeout(adjustTextSize, 100);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [content, initialStyle, minScale, step, delay]);

  return {
    ref: textRef,
    adjustedStyle,
    isAdjusted
  };
};

export default useResponsiveText;
