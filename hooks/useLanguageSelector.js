import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';

const useLanguageSelector = () => {
  const { 
    showLanguageSelector, 
    setShowLanguageSelector, 
    changeLanguage, 
    language,
    content 
  } = useApp();

  // Get language selector content based on current language or fallback
  const getSelectorContent = useCallback(() => {
    if (content?.[language]?.languageSelector) {
      return content[language].languageSelector;
    }
    // Fallback to German if current language selector is not available
    return content?.de?.languageSelector || {
      title: "Sprache wählen / Change language",
      german: "DEUTSCH",
      english: "ENGLISH"
    };
  }, [content, language]);

  // Parse title to get German and English parts intelligently
  const parseTitleParts = useCallback((title) => {
    const titleParts = title.split(' / ');
    let germanTitle, englishTitle;
    
    if (titleParts.length === 2) {
      // Check which part contains German words (contains 'ä', 'ü', 'ö' or starts with 'Sprache')
      const firstPart = titleParts[0].trim();
      const secondPart = titleParts[1].trim();
      
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

  // Memoized content data
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

  // Event handlers
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

  // Button state helpers
  const getButtonState = useCallback((buttonLanguage) => {
    const isActive = language === buttonLanguage;
    return {
      isActive,
      borderColor: isActive ? 'var(--color-kupfer)' : 'var(--color-neutral-light)',
      backgroundColor: isActive ? 'var(--color-kupfer)' : 'transparent'
    };
  }, [language]);

  // Validation
  const isVisible = useMemo(() => {
    return Boolean(showLanguageSelector && content);
  }, [showLanguageSelector, content]);

  return {
    // State
    isVisible,
    currentLanguage: language,
    
    // Data
    contentData,
    
    // Handlers
    handleLanguageChange,
    handleOverlayClick,
    handleContentClick,
    
    // Helpers
    getButtonState
  };
};

export default useLanguageSelector;
