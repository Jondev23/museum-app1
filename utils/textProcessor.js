// Utility for processing HTML tags in text content
import React from 'react';

/**
 * Process text with HTML tags for line breaks and bold formatting
 * Supports <br> tags for line breaks and <b> tags for bold text
 * @param {string} text - Text content that may contain HTML tags
 * @returns {React.ReactNode} - Processed React element with JSX
 */
export const processTextWithHTML = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }

  // Handle the original pattern for backward compatibility
  if (text.includes(' / ')) {
    const parts = text.split(' / ');
    text = parts.join('<br>');
  }

  // Process HTML tags: <br> and <b>
  const processHTMLTags = (str) => {
    // Split by <br> tags first
    const brParts = str.split(/<br\s*\/?>/i);
    
    return brParts.map((part, brIndex) => {
      // Process <b> tags within each part
      const boldParts = part.split(/(<b>.*?<\/b>)/i);
      
      const processedPart = boldParts.map((segment, boldIndex) => {
        // Check if this segment is a bold tag
        const boldMatch = segment.match(/<b>(.*?)<\/b>/i);
        if (boldMatch) {
          return (
            <span key={`bold-${brIndex}-${boldIndex}`} style={{ fontWeight: 'bold' }}>
              {boldMatch[1]}
            </span>
          );
        }
        return segment;
      });

      // Add line break after each part except the last one
      if (brIndex < brParts.length - 1) {
        return (
          <React.Fragment key={`br-${brIndex}`}>
            {processedPart}
            <br />
          </React.Fragment>
        );
      }
      
      return <React.Fragment key={`br-${brIndex}`}>{processedPart}</React.Fragment>;
    });
  };

  return processHTMLTags(text);
};

/**
 * Legacy function for backward compatibility
 * Processes text with " / " pattern for line breaks
 * @param {string} text - Text content
 * @returns {React.ReactNode} - Processed React element
 */
export const processTextLegacy = (text) => {
  if (text && text.includes(' / ')) {
    const parts = text.split(' / ');
    return (
      <>
        {parts[0].trim()}
        <br />
        {parts[1].trim()}
      </>
    );
  }
  return text;
};
