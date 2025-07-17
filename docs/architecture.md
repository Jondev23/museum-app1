# Arquitectura del Proyecto - Museum Kiosk App

## Visión General

Esta aplicación es un sistema de kiosk para museos que proporciona una experiencia interactiva de preguntas y respuestas. Ha sido refactorizada siguiendo principios de arquitectura limpia y componentes reutilizables.

## Patrón Arquitectónico

### Estructura Principal
```
Component.js (Main)
├── hooks/useComponent.js (Business Logic)
├── components/Component/ (UI Components)
│   ├── index.js (Barrel Export)
│   ├── ComponentConfig.js (Constants)
│   ├── SubComponent1.js
│   ├── SubComponent2.js
│   └── SubComponent3.js
```

### Principios Aplicados

1. **Separación de Responsabilidades**
   - Hooks: Lógica de negocio
   - Components: Presentación UI
   - Config: Constantes y configuración

2. **Reutilización**
   - Componentes pequeños y enfocados
   - Hooks personalizados
   - Sistema de variables CSS

3. **Mantenibilidad**
   - Código autocontenido
   - Documentación integrada
   - Patrones consistentes

## Componentes Principales

### 1. StartScreen
- **Propósito**: Pantalla inicial de bienvenida
- **Hook**: `useStartScreen`
- **Subcomponentes**: Title, Description, TouchIndicator
- **Funcionalidades**: Detección de gestos swipe y touch

### 2. QuestionScreen
- **Propósito**: Presentación de preguntas interactivas
- **Hook**: `useQuestionScreen`
- **Subcomponentes**: Title, AnswerButtons, Footer
- **Funcionalidades**: Selección de respuestas y navegación

### 3. FeedbackScreen
- **Propósito**: Mostrar resultados de respuestas
- **Hook**: `useFeedbackScreen`
- **Subcomponentes**: Title, Answer, Message, Button
- **Funcionalidades**: Feedback visual y botón de continuar

### 4. ScreensaverScreen
- **Propósito**: Pantalla de espera/atracción
- **Hook**: `useScreensaverScreen`
- **Subcomponentes**: Loading, Background, Title, TouchIndicator
- **Funcionalidades**: Video de fondo y activación por touch

## Sistema de Estilos

### Variables CSS Centralizadas
```css
/* Colores del sistema */
--color-primary: #61809D;
--color-secondary: #F4F4F4;
--color-success: #4CAF50;
--color-error: #F44336;
--color-warning: #FF9800;

/* Componentes específicos */
--color-question-title: var(--color-primary);
--color-feedback-correct: var(--color-success);
--color-feedback-incorrect: var(--color-error);
```

### Utilitarios JavaScript
```javascript
// utils/cssVariables.js
const COLORS = {
  PRIMARY: '#61809D',
  SECONDARY: '#F4F4F4',
  SUCCESS: '#4CAF50',
  ERROR: '#F44336'
};
```

## Flujo de Navegación

```
ScreensaverScreen → StartScreen → QuestionScreen → FeedbackScreen
         ↑                                              ↓
         ←←←←←←←←←← (timeout/completion) ←←←←←←←←←←←←←←←←←←←
```

## Gestión de Estado

### Contexto Global
```javascript
// context/AppContext.js
- currentScreen: Estado actual de la pantalla
- currentQuestion: Pregunta actual
- userAnswers: Respuestas del usuario
- language: Idioma seleccionado
- kioskData: Datos del kiosk actual
```

### Estado Local (Hooks)
- Cada componente maneja su propio estado interno
- Efectos secundarios controlados
- Memoización para optimización

## Animaciones y Transiciones

### Framer Motion
- Transiciones fluidas entre pantallas
- Animaciones de entrada/salida
- Gestos táctiles (swipe, tap)
- Animaciones de loading

### Configuración de Animaciones
```javascript
const ANIMATION_CONFIG = {
  DURATION: 0.5,
  EASE: "easeInOut",
  INITIAL: { opacity: 0, y: 20 },
  ANIMATE: { opacity: 1, y: 0 },
  EXIT: { opacity: 0, y: -20 }
};
```

## Optimizaciones Implementadas

### Performance
- `useMemo` para cálculos costosos
- `useCallback` para handlers de eventos
- Lazy loading de componentes
- Memoización de estilos

### Accesibilidad
- Alt text para imágenes
- Contraste adecuado
- Tamaños de touch targets apropiados
- Soporte para múltiples métodos de interacción

### Responsive Design
- Diseño adaptativo para diferentes tamaños
- Orientación landscape/portrait
- Escalado automático de elementos

## Estructura de Carpetas

```
/
├── components/           # Componentes React
│   ├── StartScreen.js
│   ├── QuestionScreen.js
│   ├── FeedbackScreen.js
│   ├── ScreensaverScreen.js
│   └── [Component]/      # Subcomponentes
├── hooks/               # Custom hooks
│   ├── useStartScreen.js
│   ├── useQuestionScreen.js
│   ├── useFeedbackScreen.js
│   └── useScreensaverScreen.js
├── context/             # Contextos globales
│   └── AppContext.js
├── utils/               # Utilidades
│   ├── cssVariables.js
│   ├── audioManager.js
│   └── kioskConfig.js
├── styles/              # Estilos globales
│   └── globals.css
├── public/              # Recursos estáticos
│   ├── content/         # Contenido JSON
│   ├── images/          # Imágenes
│   └── videos/          # Videos
└── docs/                # Documentación
    ├── color-system.md
    ├── screensaver-screen.md
    └── architecture.md
```

## Configuración y Deployment

### Desarrollo
```bash
npm run dev    # Servidor de desarrollo
npm run build  # Build de producción
npm run start  # Servidor de producción
```

### Electron (Desktop)
```bash
npm run electron-dev   # Desarrollo con Electron
npm run electron-pack  # Package para distribución
```

## Mejores Prácticas Implementadas

1. **Código Limpio**
   - Funciones pequeñas y enfocadas
   - Nombres descriptivos
   - Comentarios útiles

2. **Arquitectura Escalable**
   - Componentes reutilizables
   - Hooks personalizados
   - Configuración centralizada

3. **Performance**
   - Memoización estratégica
   - Optimización de renders
   - Lazy loading

4. **Mantenibilidad**
   - Documentación completa
   - Patrones consistentes
   - Separación de responsabilidades

## Próximos Pasos

1. **Testing**
   - Unit tests para hooks
   - Integration tests para componentes
   - E2E tests para flujos completos

2. **Monitoreo**
   - Logging de errores
   - Analytics de uso
   - Performance monitoring

3. **Extensibilidad**
   - Sistema de plugins
   - Temas personalizables
   - Internacionalización avanzada
