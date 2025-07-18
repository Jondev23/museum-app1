import { useEffect, useRef, useState } from 'react';

/**
 * Hook personalizado para ajustar automáticamente el tamaño de texto
 * basado en el espacio disponible del contenedor
 * 
 * @param {Object} initialStyle - Estilo inicial del texto
 * @param {string} content - Contenido del texto que puede cambiar
 * @param {Object} options - Opciones de configuración
 * @param {number} options.minScale - Escala mínima (0.5 = 50% del tamaño original)
 * @param {number} options.step - Paso de reducción en pixels
 * @param {number} options.delay - Retraso antes de ajustar (ms)
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
        // Resetear al tamaño original
        element.style.fontSize = initialStyle.fontSize;
        element.style.lineHeight = initialStyle.lineHeight;
        
        const containerHeight = element.offsetHeight;
        const containerWidth = element.offsetWidth;
        
        let currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        const minSize = currentSize * minScale;
        let wasAdjusted = false;
        
        // Ajustar hasta que el texto quepa en el contenedor
        while ((element.scrollHeight > containerHeight || element.scrollWidth > containerWidth) && currentSize > minSize) {
          currentSize -= step;
          element.style.fontSize = `${currentSize}px`;
          element.style.lineHeight = `${currentSize * 1.25}px`;
          wasAdjusted = true;
        }
        
        // Actualizar el estado con el nuevo estilo
        setAdjustedStyle({
          ...initialStyle,
          fontSize: `${currentSize}px`,
          lineHeight: `${currentSize * 1.25}px`
        });
        
        setIsAdjusted(wasAdjusted);
      };

      // Ajustar tamaño después de que el contenido se renderice
      const timer = setTimeout(adjustTextSize, delay);
      
      // Reajustar en cambios de ventana
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
