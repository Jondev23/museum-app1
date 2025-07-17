# ResultsScreen - Documentación Técnica

## Estructura del Componente

### Hook personalizado: `useResultsScreen`
- **Propósito**: Gestiona la lógica de negocio de la pantalla de resultados
- **Funcionalidades**:
  - Cálculo de puntaje final
  - Procesamiento de contenido dinámico
  - Gestión de eventos de interacción (replay, touch)
  - Animaciones de contenido
  - Validación de datos

### Componentes UI:

#### `ResultsTitle`
- **Propósito**: Muestra el título principal basado en el puntaje
- **Funcionalidades**:
  - Título dinámico según el score obtenido
  - Animación de entrada desde abajo
  - Soporte multiidioma

#### `ResultsScoreText`
- **Propósito**: Muestra el texto del puntaje obtenido
- **Funcionalidades**:
  - Formato dinámico "X de Y preguntas correctas"
  - Reemplazo automático de variables {score} y {total}
  - Animación con delay escalonado

#### `ResultsProgress`
- **Propósito**: Visualización de progreso con puntos
- **Funcionalidades**:
  - Integración con ProgressDots compartido
  - Variante específica para resultados
  - Indicadores visuales de respuestas correctas/incorrectas

#### `ResultsPlayAgainButton`
- **Propósito**: Botón para reiniciar el quiz
- **Funcionalidades**:
  - Animación de entrada retardada
  - Efectos hover y tap
  - Icono SVG integrado
  - Texto configurable

#### `ResultsBackground`
- **Propósito**: Fondo de imagen con overlay
- **Funcionalidades**:
  - Imagen de fondo configurable
  - Overlay oscuro para contraste
  - Fallback automático a imagen por defecto

## Configuración

### Variables CSS específicas:
```css
--color-results-title: var(--color-text-primary);
--color-results-score-text: var(--color-text-primary);
--color-results-button-text: var(--color-text-primary);
--color-results-overlay: rgba(0, 0, 0, 0.75);
--color-results-success: var(--color-success);
--color-results-background: var(--color-background);
```

### Configuración de animaciones:
```javascript
ANIMATION_CONFIG: {
  CONTAINER: {
    INITIAL: { x: '100%' },
    ANIMATE: { x: 0 },
    EXIT: { x: '-100%' },
    TRANSITION: { duration: 0.5 }
  },
  
  CONTENT_REVEAL: {
    INITIAL: { y: 50, opacity: 0 },
    ANIMATE: { y: 0, opacity: 1 },
    TRANSITION: { duration: 0.8 }
  },
  
  DELAYS: {
    TITLE: 0.2,
    SUBTITLE: 0.4,
    BUTTON: 1.0
  }
}
```

## Estados del Componente

1. **Loading**: Animación inicial del contenedor
2. **Content Reveal**: Aparición escalonada de elementos
3. **Interactive**: Estado completamente cargado e interactivo
4. **Invalid**: Datos insuficientes (retorna null)

## Funcionalidades Implementadas

### Cálculo de contenido dinámico:
```javascript
const contentData = {
  title: results.messages?.[score] || fallbackTitle,
  scoreText: results.scoreText?.replace('{score}', score).replace('{total}', total),
  playAgainText: results.playAgain || 'NOCH EINMAL',
  backgroundImage: startContent?.backgroundImage || defaultImage
};
```

### Gestión de eventos:
- `handlePlayAgain`: Reinicia el quiz
- `handleTouchAnywhere`: Detecta touch fuera de botones
- Prevención de activación accidental en selectores

### Animaciones escalonadas:
- **Título**: Delay 0.2s
- **Texto de puntaje**: Delay 0.4s  
- **Botón**: Delay 1.0s
- **Progreso**: Sin delay

## Mejoras Implementadas

### Performance:
- Memoización de cálculos costosos (`useMemo`)
- Callbacks optimizados (`useCallback`)
- Cálculo de score memoizado
- Datos de contenido procesados una sola vez

### Mantenibilidad:
- Configuración centralizada
- Componentes pequeños y enfocados
- Separación clara de responsabilidades
- Sistema de colores integrado

### Experiencia de Usuario:
- Transiciones suaves entre pantallas
- Feedback visual inmediato
- Soporte para múltiples idiomas
- Interacción táctil optimizada

## Responsive Design

### Tipografía adaptativa:
```css
fontSize: 'min(4.8rem, 8vw)'  // Título
fontSize: 'min(3.2rem, 5.5vw)' // Subtítulo
fontSize: 'min(1.5rem, 2.5vw)' // Botón
```

### Espaciado responsivo:
```css
marginBottom: 'min(2rem, 3vh)'  // Título
marginBottom: 'min(3rem, 4vh)'  // Subtítulo
marginBottom: 'min(4rem, 6vh)'  // Progreso
```

## Estructura de Archivos

```
components/
├── ResultsScreen.js (Principal)
└── ResultsScreen/
    ├── index.js (Barrel export)
    ├── ResultsScreenConfig.js
    ├── ResultsTitle.js
    ├── ResultsScoreText.js
    ├── ResultsPlayAgainButton.js
    ├── ResultsProgress.js
    └── ResultsBackground.js

hooks/
└── useResultsScreen.js
```

## Integración con el Sistema

### Contexto de aplicación:
- Acceso a `getScore()` para cálculo de puntaje
- Uso de `beginQuiz()` para reiniciar
- Lectura de `content[language]` para textos
- Integración con `questions` y `answers`

### Navegación:
- Entrada desde FeedbackScreen (slide desde derecha)
- Salida hacia StartScreen (slide hacia izquierda)
- Activación por timeout automático

## Casos de Uso

1. **Finalización exitosa**: Muestra puntaje y felicitaciones
2. **Reinicio rápido**: Touch anywhere para volver a empezar
3. **Selección idioma**: Cambio sin perder estado
4. **Feedback visual**: Progreso con indicadores de color

## Optimizaciones Futuras

1. **Animaciones**: Transiciones más elaboradas por puntaje
2. **Personalización**: Mensajes específicos por rango de score
3. **Estadísticas**: Historial de intentos y mejores puntajes
4. **Gamificación**: Achievements y reconocimientos especiales
