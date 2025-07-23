// Tipos TypeScript para la aplicación del museo

export interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ScreenContent {
  title: string;
  subtitle: string;
  subtitleColor?: string;
  highlightText: string;
  introText: string;
  swipeText: string;
  backgroundImage: string;
}

export interface ScreensaverContent {
  handIcon: string;
  message: string;
}

export interface LanguageSelectorContent {
  title: string;
  german: string;
  english: string;
}

export interface QuizContent {
  nextQuestion: string;
  showResults: string;
  correctFeedback: string[];
  incorrectFeedback: string[];
}

export interface ResultsContent {
  scoreText: string;
  scoreTextColor?: string;
  messages: Record<string, string>;
  playAgain: string;
}

export interface LanguageContent {
  screensaver: ScreensaverContent;
  startScreen: ScreenContent;
  languageSelector: LanguageSelectorContent;
  quiz: QuizContent;
  results: ResultsContent;
  questions: Question[];
}

export interface AppContent {
  de: LanguageContent;
  en: LanguageContent;
}

export interface KioskConfig {
  id: string;
  name: string;
  theme: string;
  contentFile: string;
}

export type ScreenType = 'screensaver' | 'start' | 'question' | 'feedback' | 'results';
export type ProgressStatus = 'current' | 'correct' | 'incorrect' | 'unanswered';
export type Language = 'de' | 'en';
