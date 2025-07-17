/**
 * Utilidades para trabajar con variables CSS globales
 * Este archivo centraliza el acceso a las variables CSS definidas en globals.css
 */

// Función para obtener el valor de una variable CSS
const getCSSVariable = (variableName) => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }
  return '';
};

// Objeto con las variables CSS disponibles
export const CSS_VARIABLES = {
  // Fonts
  FONT_SERIF: '--font-serif',
  FONT_SANS: '--font-sans',
  
  // Main colors
  COLOR_LIGHT_GRAY: '--color-light-gray',
  COLOR_GREEN: '--color-green',
  
  // Feedback colors
  COLOR_FEEDBACK_CORRECT: '--color-feedback-correct',
  COLOR_FEEDBACK_INCORRECT: '--color-feedback-incorrect',
  COLOR_FEEDBACK_ANSWER_BG: '--color-feedback-answer-bg',
  COLOR_FEEDBACK_ANSWER_TEXT: '--color-feedback-answer-text',
  
  // System colors
  COLOR_OVERLAY: '--color-overlay',
  COLOR_BACKGROUND_PRIMARY: '--color-background-primary',
  COLOR_TEXT_PRIMARY: '--color-text-primary',
  COLOR_TEXT_SECONDARY: '--color-text-secondary',
  COLOR_ACCENT: '--color-accent',
  
  // Screensaver colors
  COLOR_SCREENSAVER_TITLE: '--color-screensaver-title',
  COLOR_SCREENSAVER_OVERLAY: '--color-screensaver-overlay',
  COLOR_SCREENSAVER_TOUCH_BG: '--color-screensaver-touch-bg',
  COLOR_SCREENSAVER_TOUCH_BORDER: '--color-screensaver-touch-border',
  
  // Results screen colors
  COLOR_RESULTS_TITLE: '--color-results-title',
  COLOR_RESULTS_SCORE_TEXT: '--color-results-score-text',
  COLOR_RESULTS_BUTTON_TEXT: '--color-results-button-text',
  COLOR_RESULTS_OVERLAY: '--color-results-overlay',
  COLOR_RESULTS_SUCCESS: '--color-results-success',
  COLOR_RESULTS_BACKGROUND: '--color-results-background',
  
  // Language selector colors
  COLOR_LANGUAGE_OVERLAY: '--color-language-overlay',
  COLOR_LANGUAGE_TITLE: '--color-language-title',
  COLOR_LANGUAGE_SUBTITLE: '--color-language-subtitle',
  COLOR_LANGUAGE_BUTTON_ACTIVE: '--color-language-button-active',
  COLOR_LANGUAGE_BUTTON_INACTIVE: '--color-language-button-inactive',
  COLOR_LANGUAGE_BUTTON_TEXT: '--color-language-button-text',
  COLOR_LANGUAGE_ICON: '--color-language-icon',
  COLOR_RESULTS_BACKGROUND: '--color-results-background',
};

// Función helper para usar variables CSS en JavaScript
export const useCSS = (variableName) => {
  return `var(${variableName})`;
};

// Objeto con los valores de colores para usar en JavaScript
export const COLORS = {
  // Feedback colors
  FEEDBACK_CORRECT: useCSS(CSS_VARIABLES.COLOR_FEEDBACK_CORRECT),
  FEEDBACK_INCORRECT: useCSS(CSS_VARIABLES.COLOR_FEEDBACK_INCORRECT),
  FEEDBACK_ANSWER_BG: useCSS(CSS_VARIABLES.COLOR_FEEDBACK_ANSWER_BG),
  FEEDBACK_ANSWER_TEXT: useCSS(CSS_VARIABLES.COLOR_FEEDBACK_ANSWER_TEXT),
  
  // Main colors
  LIGHT_GRAY: useCSS(CSS_VARIABLES.COLOR_LIGHT_GRAY),
  GREEN: useCSS(CSS_VARIABLES.COLOR_GREEN),
  
  // System colors
  TEXT_PRIMARY: useCSS(CSS_VARIABLES.COLOR_TEXT_PRIMARY),
  TEXT_SECONDARY: useCSS(CSS_VARIABLES.COLOR_TEXT_SECONDARY),
  ACCENT: useCSS(CSS_VARIABLES.COLOR_ACCENT),
  
  // Screensaver colors
  SCREENSAVER_TITLE: useCSS(CSS_VARIABLES.COLOR_SCREENSAVER_TITLE),
  SCREENSAVER_OVERLAY: useCSS(CSS_VARIABLES.COLOR_SCREENSAVER_OVERLAY),
  SCREENSAVER_TOUCH_BG: useCSS(CSS_VARIABLES.COLOR_SCREENSAVER_TOUCH_BG),
  SCREENSAVER_TOUCH_BORDER: useCSS(CSS_VARIABLES.COLOR_SCREENSAVER_TOUCH_BORDER),
};

// Función para obtener un color específico
export const getColor = (colorKey) => {
  return COLORS[colorKey] || '';
};

// Función para generar className de Tailwind usando variables CSS
export const getCSSVariableClass = (property, variableName) => {
  // Para usar con Tailwind CSS con variables personalizadas
  return `${property}-[var(${variableName})]`;
};
