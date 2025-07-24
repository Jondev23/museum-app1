// Import React hooks and app context
import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

// Custom hook for language selector functionality
const useLanguageSelector = () => {
  // Get language-related functions and state from app context
  const { 
    showLanguageSelector, 
    setShowLanguageSelector, 
    changeLanguage, 
    language,
    content 
  } = useApp();

  // Get language selector content with fallback values
  const getSelectorContent = useCallback(() => {
    if (content?.[language]?.languageSelector) {
      return content[language].languageSelector;
    }
    // Fallback to German content or default values
    return content?.de?.languageSelector || {
      title: "Sprache wählen / Change language",
      german: "DEUTSCH",
      english: "ENGLISH"
    };
  }, [content, language]);

  // Parse bilingual title string into separate German/English parts
  const parseTitleParts = useCallback((title) => {
    const titleParts = title.split(' / ');
    let germanTitle, englishTitle;
    
    if (titleParts.length === 2) {
      const firstPart = titleParts[0].trim();
      const secondPart = titleParts[1].trim();
      
      // Detect German text by umlauts or specific words
      const isFirstPartGerman = /[äöüÄÖÜ]/.test(firstPart) || firstPart.toLowerCase().includes('sprache');
      
      if (isFirstPartGerman) {
        germanTitle = firstPart;
        englishTitle = secondPart;
      } else {
        englishTitle = firstPart;
        germanTitle = secondPart;
      }
    } else {
      // Fallback if format is unexpected
      germanTitle = "Sprache wählen";
      englishTitle = "Change language";
    }

    return { germanTitle, englishTitle };
  }, []);

  // Memoized content data for the language selector
  const contentData = useMemo(() => {
    if (!content) return null;

    const selectorContent = getSelectorContent();
    const { germanTitle, englishTitle } = parseTitleParts(selectorContent.title);

    return {
      selectorContent,
      germanTitle,
      englishTitle,
      germanButtonText: selectorContent.german,
      englishButtonText: selectorContent.english
    };
  }, [content, getSelectorContent, parseTitleParts]);

  const handleLanguageChange = useCallback((newLanguage) => {
    console.log('Changing language from', language, 'to', newLanguage);
    changeLanguage(newLanguage);
  }, [language, changeLanguage]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setShowLanguageSelector(false);
    }
  }, [setShowLanguageSelector]);

  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const getButtonState = useCallback((buttonLanguage) => {
    const isActive = language === buttonLanguage;
    return {
      isActive,
      borderColor: isActive ? 'var(--color-kupfer)' : 'var(--color-neutral-light)',
      backgroundColor: isActive ? 'var(--color-kupfer)' : 'transparent'
    };
  }, [language]);

  const isVisible = useMemo(() => {
    return Boolean(showLanguageSelector && content);
  }, [showLanguageSelector, content]);

  return {
    isVisible,
    currentLanguage: language,
    
    contentData,
    
    handleLanguageChange,
    handleOverlayClick,
    handleContentClick,
    
    getButtonState
  };
};

export default useLanguageSelector;
