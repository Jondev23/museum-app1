# Documentación Técnica - Museum Kutschen Kiosk App

## Arquitectura de la Aplicación

### Stack Tecnológico
- **Frontend**: Next.js 15 + React 19
- **Desktop**: Electron 37
- **Styling**: Tailwind CSS 3.4
- **Animaciones**: Framer Motion 11
- **TypeScript**: Soporte completo
- **State Management**: React Context

### Estructura del Proyecto

```
museum-kutschen-app/
├── components/          # Componentes React reutilizables
│   ├── ScreensaverScreen.js    # Pantalla de reposo
│   ├── StartScreen.js          # Pantalla de inicio
│   ├── QuestionScreen.js       # Pantalla de preguntas
│   ├── FeedbackScreen.js       # Retroalimentación de respuestas
│   ├── ResultsScreen.js        # Pantalla de resultados
│   ├── LanguageSelector.js     # Selector de idioma
│   ├── ProgressBar.js          # Barra de progreso
│   └── AdminPanel.js           # Panel de administración
├── content/             # Contenido JSON por kiosk
│   ├── kiosk1.json            # Contenido general
│   ├── kiosk2.json            # Contenido de lujo
│   └── kiosk3.json            # Contenido de artesanía
├── context/             # Gestión de estado global
│   └── AppContext.js          # Context principal de la app
├── electron/            # Configuración de Electron
│   ├── main.js               # Proceso principal
│   └── preload.js            # Script de precarga
├── pages/               # Páginas de Next.js
│   ├── _app.js               # App wrapper
│   └── index.js              # Página principal
├── styles/              # Estilos CSS
│   └── globals.css           # Estilos globales
├── types/               # Definiciones TypeScript
│   └── index.ts              # Tipos principales
├── utils/               # Utilidades
│   ├── kioskConfig.js        # Configuración de kiosks
│   └── audioManager.js       # Gestión de audio (futuro)
└── public/              # Assets estáticos
    └── images/               # Imágenes
```

## Flujo de la Aplicación

### 1. Inicialización
- Electron inicia la aplicación en modo kiosk (fullscreen)
- Se detecta el ID del kiosk (URL param o localStorage)
- Se carga el contenido JSON correspondiente
- Se configura el timer de inactividad (3 minutos)

### 2. Pantallas y Navegación

#### Screensaver (Reposo)
- **Trigger**: Inicio de app o inactividad
- **Elementos**: Animación de mano, mensaje de bienvenida
- **Acción**: Touch → StartScreen

#### Start Screen (Inicio)  
- **Elementos**: Título, subtítulo, intro, selector de idioma
- **Navegación**: Swipe left o click → QuestionScreen
- **Características**: Animaciones de entrada desde la derecha

#### Question Screen (Preguntas)
- **Elementos**: Pregunta, 3 opciones, barra de progreso
- **Lógica**: 5 preguntas aleatorias del pool
- **Acción**: Selección → FeedbackScreen

#### Feedback Screen (Retroalimentación)
- **Elementos**: Pregunta, respuesta seleccionada, explicación
- **Visualización**: Verde (correcto) / Rojo (incorrecto)
- **Acción**: "Siguiente" → QuestionScreen | "Resultados" → ResultsScreen

#### Results Screen (Resultados)
- **Elementos**: Score, mensaje personalizado, confetti (score >= 4)
- **Visualización**: Puntos de progreso coloreados
- **Acción**: Touch anywhere → nueva sesión

### 3. Sistema de Idiomas
- **Idiomas**: Alemán (de) y Inglés (en)
- **Cambio**: Dinámico durante la sesión
- **Persistencia**: Se mantiene hasta cambio manual
- **Reinicio**: Vuelve a StartScreen tras cambio

## Configuración por Kiosk

### Archivos de Contenido
Cada kiosk tiene su propio archivo JSON con estructura completa:

```json
{
  "de": {
    "screensaver": { ... },
    "startScreen": { ... },
    "quiz": { ... },
    "results": { ... },
    "questions": [...]
  },
  "en": { ... }
}
```

### Detección de Kiosk
1. **URL Parameter**: `?kiosk=kiosk2`
2. **localStorage**: Valor previamente guardado
3. **Default**: kiosk1

### Personalización
- **Temas**: Diferentes colores y fondos por kiosk
- **Contenido**: Pool de preguntas específico
- **Mensajes**: Textos adaptados al tema del kiosk

## Sistema de Administración

### Acceso al Panel Admin
1. Click secuencial en 4 esquinas: top-left → top-right → bottom-right → bottom-left
2. Password: `museum2024`

### Funcionalidades Admin
- **Reload Content**: Recarga contenido JSON sin reiniciar
- **Exit Kiosk**: Salida controlada del modo kiosk
- **Panel oculto**: Invisible para usuarios normales

## Características Técnicas

### Gestión de Estado
- **Context API**: Estado global compartido
- **Local State**: Estado específico de componentes
- **Persistencia**: localStorage para configuración de kiosk

### Optimizaciones de Rendimiento
- **Lazy Loading**: Componentes se cargan según necesidad
- **Memory Management**: Cleanup de timers y listeners
- **Asset Optimization**: Imágenes y recursos optimizados

### Seguridad Kiosk
- **Fullscreen Lock**: No chrome del navegador
- **Keyboard Shortcuts**: Deshabilitados (F11, Alt+F4, etc.)
- **Navigation Lock**: Previene navegación externa
- **Auto-recovery**: Vuelve a screensaver tras inactividad

### Accesibilidad
- **Touch Optimized**: Diseño para pantallas táctiles
- **Large Targets**: Botones grandes para fácil interacción
- **Clear Contrast**: Colores con buen contraste
- **Simple Navigation**: Flujo lineal e intuitivo

## Despliegue y Distribución

### Desarrollo Local
```bash
npm run dev          # Desarrollo con hot reload
npm run dev:kiosk1   # Desarrollo para kiosk específico
npm run build        # Build de producción
```

### Distribución
```bash
npm run dist         # Crear ejecutable para distribución
```

### Configuración de Kiosk
1. Instalar aplicación en computer del kiosk
2. Configurar autostart
3. Opcional: Añadir `?kiosk=kioskX` al shortcut

## Mantenimiento

### Actualización de Contenido
1. Editar archivo JSON correspondiente
2. Usar panel admin para reload en vivo
3. O reiniciar aplicación

### Logs y Debugging
- **Development**: Console logs disponibles
- **Production**: Logs en Electron DevTools (Admin panel)

### Backup y Versionado
- Mantener backup de archivos JSON
- Versionado de contenido para rollback si necesario

## Extensibilidad

### Nuevos Kiosks
1. Crear nuevo archivo `kioskX.json`
2. Añadir configuración en `utils/kioskConfig.js`
3. La app detecta automáticamente nuevos kiosks

### Nuevas Funcionalidades
- **Audio**: Framework preparado en `utils/audioManager.js`
- **Animaciones**: Fácil extensión con Framer Motion
- **Themes**: Sistema de temas implementado

### APIs Futuras
- **Analytics**: Tracking de interacciones de usuario
- **Remote Config**: Actualización remota de contenido
- **Multi-kiosk Management**: Gestión centralizada
