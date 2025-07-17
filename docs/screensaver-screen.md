# ScreensaverScreen - Documentación Técnica

## Estructura del Componente

### Hook personalizado: `useScreensaverScreen`
- **Propósito**: Gestiona la lógica de negocio del screensaver
- **Funcionalidades**:
  - Detección de estado de carga
  - Configuración de iconos (imagen vs texto)
  - Gestión de eventos de touch/click
  - Contenido por defecto y fallbacks

### Componentes UI:

#### `ScreensaverLoading`
- **Propósito**: Pantalla de carga mientras se cargan los datos
- **Animaciones**: Pulso continuo del texto "Loading..."

#### `ScreensaverBackground`
- **Propósito**: Video de fondo y overlay
- **Funcionalidades**:
  - Reproducción automática de video
  - Fallback a fondo negro si el video falla
  - Overlay para mejorar contraste del texto

#### `ScreensaverTitle`
- **Propósito**: Título principal del screensaver
- **Animaciones**: Pulso suave y entrada desde abajo

#### `ScreensaverTouchIndicator`
- **Propósito**: Indicador de interacción (toque/click)
- **Funcionalidades**:
  - Soporte para iconos SVG o texto
  - Animación de rebote continua
  - Fondo circular con blur

## Configuración

### Variables CSS específicas:
```css
--color-screensaver-title: #61809D;
--color-screensaver-overlay: rgba(0, 0, 0, 0.3);
--color-screensaver-touch-bg: rgba(255, 255, 255, 0.2);
--color-screensaver-touch-border: rgba(255, 255, 255, 0.3);
```

### Configuración de animaciones:
```javascript
TITLE_ANIMATION: {
  SCALE: [1, 1.02, 1],
  OPACITY: [0.9, 1, 0.9],
  DURATION: 3.0,
  REPEAT: Infinity,
}

TOUCH_ANIMATION: {
  Y_MOVEMENT: [0, -15, 0],
  SCALE_MOVEMENT: [1, 1.1, 1],
  DURATION: 2.5,
  REPEAT: Infinity,
}
```

## Estados del Componente

1. **Loading**: Mientras se cargan los datos del contexto
2. **Ready**: Screensaver completamente cargado y funcional
3. **Invalid**: Datos no válidos (retorna null)

## Funcionalidades Implementadas

### Detección de tipo de icono:
```javascript
const iconConfig = {
  source: iconSource,
  isImage: iconSource.includes('.svg') || iconSource.includes('.png') || iconSource.includes('.jpg'),
  fallback: defaultContent.handIcon
};
```

### Gestión de eventos:
- `onClick`: Para dispositivos con mouse
- `onTouchStart`: Para dispositivos táctiles
- Transición automática a StartScreen

### Contenido dinámico:
- Texto del título configurable
- Icono de touch configurable
- Video de fondo configurable
- Fallbacks para todos los elementos

## Mejoras Implementadas

### Performance:
- Memoización de datos derivados
- Handlers de eventos optimizados
- Estilos memoizados

### Mantenibilidad:
- Configuración centralizada
- Componentes pequeños y enfocados
- Sistema de colores integrado

### Accesibilidad:
- Alt text para imágenes
- Contraste mejorado con overlay
- Soporte para múltiples métodos de interacción

## Estructura de Archivos

```
components/
├── ScreensaverScreen.js (Principal)
└── ScreensaverScreen/
    ├── index.js
    ├── ScreensaverScreenConfig.js
    ├── ScreensaverLoading.js
    ├── ScreensaverBackground.js
    ├── ScreensaverTitle.js
    └── ScreensaverTouchIndicator.js

hooks/
└── useScreensaverScreen.js
```

## Casos de Uso

1. **Modo Kiosko**: Atrae usuarios con video y animaciones
2. **Timeout**: Vuelve automáticamente después de inactividad
3. **Interacción**: Responde a touch y click para comenzar
4. **Fallback**: Mantiene funcionalidad incluso sin contenido personalizado
