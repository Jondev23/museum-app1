// Import React hooks for responsive text functionality
import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for responsive text sizing that automatically adjusts font size to fit container
 * @param {Object} initialStyle - Initial CSS styles for the text element
 * @param {string} content - Text content to be measured and adjusted
 * @param {Object} options - Configuration options for text adjustment
 * @param {number} options.minScale - Minimum scale factor for font size (default: 0.5)
 * @param {number} options.step - Step size for font size reduction (default: 1px)
 * @param {number} options.delay - Delay before adjustment in milliseconds (default: 150ms)
 * @returns {Object} { ref, adjustedStyle, isAdjusted } - Ref for text element, adjusted styles, and adjustment flag
 */
export const useResponsiveText = (initialStyle, content, options = {}) => {
  // Extract options with default values
  const {
    minScale = 0.5,
    step = 1,
    delay = 150
  } = options;

  // State for tracking style adjustments
  const [adjustedStyle, setAdjustedStyle] = useState(initialStyle);
  const [isAdjusted, setIsAdjusted] = useState(false);
  const textRef = useRef(null);

  // Effect to handle text size adjustment when content or container changes
  useEffect(() => {
    if (textRef.current && content) {
      const element = textRef.current;
      
      // Function to adjust text size to fit container
      const adjustTextSize = () => {
        // Reset to initial size
        element.style.fontSize = initialStyle.fontSize;
        element.style.lineHeight = initialStyle.lineHeight;
        
        const containerHeight = element.offsetHeight;
        const containerWidth = element.offsetWidth;
        
        let currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        const minSize = currentSize * minScale;
        let wasAdjusted = false;
        
        // Reduce font size until text fits or minimum size is reached
        while ((element.scrollHeight > containerHeight || element.scrollWidth > containerWidth) && currentSize > minSize) {
          currentSize -= step;
          element.style.fontSize = `${currentSize}px`;
          element.style.lineHeight = `${currentSize * 1.25}px`;
          wasAdjusted = true;
        }
        
        // Update adjusted style state
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
