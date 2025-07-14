# 🏛️ Museum Kutschen Kiosk App

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)]()
[![Tech](https://img.shields.io/badge/Tech-Electron%20%2B%20Next.js-blue)]()
[![License](https://img.shields.io/badge/License-MIT-yellow)]()

Una aplicación interactiva de kiosco táctil para la exposición "Kutschen" (carruajes históricos) en el museo. Ofrece un quiz educativo con soporte multilingüe y animaciones fluidas.

![Museum Kiosk App](https://github.com/Jondev23/museum-app1/blob/main/.github/preview.png?raw=true)

## 🚀 Características Principales

- **🖥️ Modo Kiosco Completo** - Pantalla completa sin navegación del sistema
- **🌍 Multilingüe** - Alemán e Inglés con cambio dinámico
- **📱 Touch Optimizado** - Perfecto para pantallas táctiles
- **🎮 Quiz Interactivo** - 5 preguntas aleatorias con feedback inmediato
- **🎨 Animaciones Fluidas** - Transiciones suaves con Framer Motion
- **📡 Completamente Offline** - No requiere conexión a internet
- **⏰ Timer de Inactividad** - Regreso automático al screensaver
- **🔧 Multi-Kiosk** - 3 configuraciones diferentes de contenido

## 🏗️ Tecnologías

- **Frontend**: Next.js + React 19
- **Desktop**: Electron
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Estado**: React Context
- **Build**: Electron Builder

## 📋 Requisitos

- Node.js 16+ 
- npm o yarn
- macOS, Windows, o Linux

## ⚡ Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/Jondev23/museum-app1.git
cd museum-app1

# Instalar dependencias
npm install

# Ejecutar en desarrollo (MÉTODO SEGURO)
./start-dev.sh

# O paso a paso:
npm run next-dev     # Terminal 1
npm run electron-dev-manual  # Terminal 2 (esperar a que Next.js esté listo)
```

## 🎯 Uso

### Desarrollo
```bash
# Kiosk general (historia de carruajes)
npm run dev:kiosk1

# Kiosk de lujo (carruajes aristocráticos)  
npm run dev:kiosk2

# Kiosk artesanal (construcción y técnicas)
npm run dev:kiosk3
```

### Producción
```bash
# Construir la aplicación
npm run build

# Crear ejecutable
npm run build-electron

# Los archivos finales estarán en /dist/
```

## ⌨️ Atajos de Desarrollo

- **Ctrl+Q**: Salir de la aplicación
- **Ctrl+R**: Recargar
- **F12**: Abrir DevTools
- **Escape**: Salir de pantalla completa

## 📁 Estructura del Proyecto

```
museum-app1/
├── components/          # Componentes React
│   ├── ScreensaverScreen.js
│   ├── StartScreen.js
│   ├── QuestionScreen.js
│   ├── FeedbackScreen.js
│   └── ResultsScreen.js
├── content/            # Contenido JSON por kiosk
│   ├── kiosk1.json    # Historia general
│   ├── kiosk2.json    # Lujo y aristocracia
│   └── kiosk3.json    # Artesanía
├── electron/           # Configuración Electron
├── pages/             # Páginas Next.js
├── context/           # State management
└── styles/            # Estilos CSS
```

## 🔧 Personalización

### Cambiar Contenido
Edita los archivos JSON en `/content/`:

```json
{
  "de": {
    "startScreen": {
      "title": "Tu Título",
      "subtitle": "Tu Subtítulo",
      "introText": "Tu introducción..."
    },
    "questions": [
      {
        "question": "¿Tu pregunta?",
        "answers": ["Opción 1", "Opción 2", "Opción 3"],
        "correctAnswer": 0,
        "explanation": "Tu explicación"
      }
    ]
  }
}
```

### Agregar Nuevo Kiosk
1. Crea `content/kiosk4.json`
2. Copia la estructura de un archivo existente
3. Personaliza el contenido
4. Agrega script en `package.json`: `"dev:kiosk4": "KIOSK_ID=kiosk4 npm run dev-safe"`

## 📚 Documentación

- **[README.md](README.md)** - Documentación completa
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Guía de desarrollo
- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - Estado del proyecto

## 🛠️ Solución de Problemas

### App se bloquea en pantalla completa
```bash
# Usar atajos de desarrollo
Ctrl+Q  # Para salir
Ctrl+R  # Para recargar
```

### Next.js no inicia
```bash
# Limpiar y reinstalar
rm -rf .next node_modules
npm install
npm run next-dev
```

### Errores de contenido JSON
```bash
# Verificar sintaxis JSON
npm run lint
# O usar un validador online
```

## 🚀 Deployment

### Para Kioscos del Museo
1. Ejecutar `npm run build-electron`
2. Copiar archivos de `/dist/` al kiosk
3. Instalar y configurar autostart
4. Configurar pantalla táctil

### Para Diferentes Sistemas Operativos
- **Windows**: Genera archivo `.exe`
- **macOS**: Genera archivo `.dmg`
- **Linux**: Genera archivo `.AppImage`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Jonathan Aguilera** - [Jondev23](https://github.com/Jondev23)

## 🙏 Agradecimientos

- Equipo del museo por los requerimientos
- Comunidad de Electron y Next.js
- Contribuidores de código abierto

---

**🏛️ Creado especialmente para la exposición "Kutschen" - Una experiencia educativa interactiva**
