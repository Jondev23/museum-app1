# LanguageSelector - Documentación Técnica

## Estructura del Componente

### Hook personalizado: `useLanguageSelector`
- **Propósito**: Gestiona la lógica de negocio del selector de idiomas
- **Funcionalidades**:
  - Parsing inteligente de títulos bilingües
  - Gestión de estado de visibilidad
  - Procesamiento de contenido dinámico
  - Manejo de eventos de interacción
  - Estados de botones activos/inactivos

### Componentes UI:

#### `LanguageOverlay`
- **Propósito**: Overlay modal de fondo completo
- **Funcionalidades**:
  - Animación de fade in/out
  - Detección de click para cerrar
  - Fondo semi-transparente

#### `LanguageContainer`
- **Propósito**: Contenedor principal del selector
- **Funcionalidades**:
  - Animación de escala y opacidad
  - Centrado vertical y horizontal
  - Prevención de propagación de eventos

#### `LanguageIcon`
- **Propósito**: Icono de globo terráqueo
- **Funcionalidades**:
  - Animación de entrada con escala
  - Delay escalonado
  - Responsive scaling

#### `LanguageTitle`
- **Propósito**: Títulos en inglés y alemán
- **Funcionalidades**:
  - Parsing automático de formato "Text / Text"
  - Detección inteligente de idioma alemán
  - Animación de entrada desde abajo

#### `LanguageButtons`
- **Propósito**: Contenedor de botones de idioma
- **Funcionalidades**:
  - Animación de entrada con delay
  - Gestión de estado activo/inactivo
  - Distribución vertical responsiva

#### `LanguageButton`
- **Propósito**: Botón individual de idioma
- **Funcionalidades**:
  - Estados visuales activo/inactivo
  - Animaciones hover y tap
  - Bordes y colores dinámicos

## Configuración

### Variables CSS específicas:
```css
--color-language-overlay: #344243;
--color-language-title: var(--color-text-primary);
--color-language-subtitle: var(--color-text-primary);
--color-language-button-active: #A94930;
--color-language-button-inactive: #D9D9D9;
--color-language-button-text: var(--color-text-primary);
--color-language-icon: var(--color-text-primary);
```

### Configuración de animaciones:
```javascript
ANIMATION_CONFIG: {
  OVERLAY: {
    INITIAL: { opacity: 0 },
    ANIMATE: { opacity: 1 },
    EXIT: { opacity: 0 },
    TRANSITION: { duration: 0.3 }
  },
  
  CONTAINER: {
    INITIAL: { scale: 0.8, opacity: 0 },
    ANIMATE: { scale: 1, opacity: 1 },
    EXIT: { scale: 0.8, opacity: 0 },
    TRANSITION: { duration: 0.3 }
  },
  
  GLOBE_ICON: {
    INITIAL: { scale: 0 },
    ANIMATE: { scale: 1 },
    TRANSITION: { duration: 0.3, delay: 0.1 }
  }
}
```

## Lógica de Parsing de Títulos

### Detección inteligente de idioma:
```javascript
const isFirstPartGerman = /[äöüÄÖÜ]/.test(firstPart) || 
                         firstPart.toLowerCase().includes('sprache');
```

### Formato esperado:
- `"Sprache wählen / Change language"`
- `"Change language / Sprache wählen"`
- Fallback automático si el formato no coincide

### Procesamiento:
1. **Split por '/'**: Separa en dos partes
2. **Detección de alemán**: Busca caracteres especiales o palabras clave
3. **Asignación correcta**: Coloca cada parte en su idioma correspondiente
4. **Fallback**: Usa textos por defecto si falla

## Estados del Componente

### Visibilidad:
- **Visible**: `showLanguageSelector = true` y `content` disponible
- **Oculto**: Cualquier condición falsa

### Botones:
- **Activo**: Idioma actual seleccionado
- **Inactivo**: Idioma no seleccionado
- **Hover**: Efecto de escala al pasar el cursor
- **Tap**: Efecto de escala al presionar

## Funcionalidades Implementadas

### Parsing de contenido:
```javascript
const getSelectorContent = useCallback(() => {
  if (content?.[language]?.languageSelector) {
    return content[language].languageSelector;
  }
  return content?.de?.languageSelector || defaultContent;
}, [content, language]);
```

### Estados de botón:
```javascript
const getButtonState = useCallback((buttonLanguage) => {
  const isActive = language === buttonLanguage;
  return {
    isActive,
    borderColor: isActive ? '#A94930' : '#D9D9D9',
    backgroundColor: isActive ? '#A94930' : 'transparent'
  };
}, [language]);
```

### Gestión de eventos:
- `handleLanguageChange`: Cambia idioma y registra en consola
- `handleOverlayClick`: Cierra modal si click en overlay
- `handleContentClick`: Previene cierre accidental

## Mejoras Implementadas

### Performance:
- Memoización de parsing de títulos
- Callbacks optimizados para eventos
- Cálculo de estados memoizado
- Contenido procesado una sola vez

### Mantenibilidad:
- Lógica de parsing centralizada
- Componentes pequeños y enfocados
- Configuración separada
- Sistema de colores integrado

### Experiencia de Usuario:
- Animaciones suaves y escalonadas
- Feedback visual inmediato
- Detección inteligente de idioma
- Responsive design completo

## Responsive Design

### Dimensiones adaptativas:
```css
/* Icono */
width: 'min(5.4rem, 13.5vw)'
height: 'min(5.4rem, 13.5vw)'

/* Títulos */
fontSize: 'min(2.5rem, 6.2vw)'

/* Botones */
width: 'min(max(21rem, 53vw), 75rem)'
height: 'min(3.47rem, 8.31vw)'
fontSize: 'min(1.25rem, 2.5vw)'
```

### Espaciado responsivo:
```css
gap: 'min(3.24rem, 6.08vw)'        // Elementos principales
gap: 'min(1.5rem, 3vw)'            // Botones
padding: '0 min(2rem, 4vw)'        // Contenedor
```

## Estructura de Archivos

```
components/
├── LanguageSelector.js (Principal)
└── LanguageSelector/
    ├── index.js (Barrel export)
    ├── LanguageSelectorConfig.js
    ├── LanguageIcon.js
    ├── LanguageTitle.js
    ├── LanguageButton.js
    ├── LanguageButtons.js
    ├── LanguageOverlay.js
    └── LanguageContainer.js

hooks/
└── useLanguageSelector.js
```

## Integración con el Sistema

### Contexto de aplicación:
- `showLanguageSelector`: Estado de visibilidad
- `setShowLanguageSelector`: Control de apertura/cierre
- `changeLanguage`: Función de cambio de idioma
- `language`: Idioma actual seleccionado
- `content`: Contenido dinámico por idioma

### Activación:
- Click en LanguageSelectorIcon (shared component)
- Aparece como overlay modal
- Cierre por click fuera o selección de idioma

## Casos de Uso

1. **Cambio de idioma**: Selección entre alemán e inglés
2. **Feedback visual**: Botón activo resaltado
3. **Contenido dinámico**: Textos desde JSON de contenido
4. **Fallback inteligente**: Funciona incluso con contenido incompleto

## Optimizaciones Implementadas

### Parsing inteligente:
- Detección automática de idioma alemán
- Soporte para múltiples formatos de título
- Fallbacks robustos

### Animaciones optimizadas:
- Delays escalonados para mejor UX
- Transiciones suaves
- Performance optimizada

### Estados visuales:
- Colores dinámicos según selección
- Feedback inmediato
- Consistencia visual

## Optimizaciones Futuras

1. **Internacionalización**: Soporte para más idiomas
2. **Persistencia**: Recordar selección del usuario
3. **Accesibilidad**: Mejores etiquetas ARIA
4. **Animaciones**: Transiciones más elaboradas
5. **Temas**: Colores personalizables por kiosk
