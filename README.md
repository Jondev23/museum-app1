# Museum Kutschen Interactive Kiosk App

## 📋 Description

Interactive kiosk application designed for a museum exhibition about **Kutschen** (historical horse-drawn carriages). The application allows visitors to participate in an interactive quiz about transportation history and travel distances in the 19th century.

## ✨ Key Features

### 🎮 User Experience
- **Interactive Quiz**: 5 random questions about horse-drawn carriages and historical transportation
- **Multi-language Support**: German and English language options
- **Screensaver Mode**: Automatically activates after 3 minutes of inactivity
- **Touch Interface**: Optimized for touchscreen devices and kiosks

### 🏛️ Multi-Kiosk Configuration
- **Kiosk 1**: Kutschen Geschichte (General History)
- **Kiosk 2**: Luxuskutschen (Luxury Carriages)
- **Kiosk 3**: Kutschenbau (Carriage Construction)

### 📱 Application Screens
1. **Screensaver**: Idle screen with touch indication
2. **Start Screen**: Welcome screen with theme information
3. **Question Screen**: Multiple-choice question display
4. **Feedback Screen**: Immediate feedback for each answer
5. **Results Screen**: Final score and personalized message

## 🛠️ Technologies

- **Frontend**: Next.js 15.3.5, React 19.1.0
- **Animations**: Framer Motion 11.3.0
- **Styling**: Tailwind CSS 3.4.0
- **Desktop**: Electron 37.2.1
- **Languages**: TypeScript, JavaScript
- **Effects**: React Confetti, Lottie React

## 📁 Project Structure

```
museum-kutschen-app/
├── components/              # React components organized by screen
│   ├── StartScreen/        # Start screen components
│   ├── QuestionScreen/     # Question screen components
│   ├── FeedbackScreen/     # Feedback screen components
│   ├── ResultsScreen/      # Results screen components
│   ├── ScreensaverScreen/  # Screensaver components
│   ├── LanguageSelector/   # Language selector components
│   └── shared/             # Shared components
├── context/                # Context API for state management
├── hooks/                  # Custom hooks for component logic
├── pages/                  # Next.js pages
├── public/
│   ├── content/           # JSON files with content per kiosk
│   ├── images/            # Images and assets
│   └── videos/            # Application videos
├── electron/              # Electron configuration
├── styles/                # Global styles
└── utils/                 # Utilities and configuration
```

## 🚀 Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd museum-kutschen-app

# Install dependencies
npm install
```

### Available Scripts

```bash
# Development
npm run dev                 # Start application in development mode
npm run next-dev           # Next.js server only
npm run electron-dev       # Electron application only

# Development per Kiosk
npm run dev:kiosk1         # Development for Kiosk 1
npm run dev:kiosk2         # Development for Kiosk 2
npm run dev:kiosk3         # Development for Kiosk 3

# Production
npm run build              # Build Next.js application
npm run build-electron     # Build complete Electron application
npm run dist               # Create distributable
npm run pack               # Package without distributing

# Utilities
npm run lint               # Run linter
npm run type-check         # Check TypeScript types
```

## ⚙️ Configuration

### Kiosk Configuration
The application automatically detects the kiosk based on:
1. URL parameter: `?kiosk=kiosk1`
2. Browser localStorage
3. Default configuration (kiosk1)

### Content
Content is dynamically loaded from JSON files in `/public/content/`:
- `kiosk1.json` - General Kutschen History
- `kiosk2.json` - Luxury Carriages
- `kiosk3.json` - Carriage Construction

### Electron Configuration
- **Development**: Normal window with DevTools
- **Production**: Full kiosk mode, fullscreen
- **Inactivity**: Automatic 3-minute timer

## 🎯 Special Features

### Scoring System
- 5 random questions per session
- Immediate feedback per question
- Personalized messages based on score (0-5)
- Visual progress indicators

### Language Management
- Dynamic switching between German and English
- Fully localized content
- Progress preservation when changing language

### Kiosk Mode
- Disabled dangerous keyboard shortcuts
- Prevention of external navigation
- Automatic inactivity timer
- Forced fullscreen mode

## 🔧 Development

### Component Structure
Each screen is organized in its own folder with:
- `index.js` - Main component
- `ComponentConfig.js` - Configuration and styles
- Specific subcomponents

### Context API
Global state is managed through `AppContext`:
- Screen state
- Current language
- Quiz progress
- Kiosk configuration

### Custom Hooks
Specialized hooks for each screen:
- `useStartScreen` - Start screen logic
- `useQuestionScreen` - Question management
- `useResultsScreen` - Results calculation
- `useResponsiveText` - Responsive text

## 📄 License

MIT License

## 👥 Author

Museum Team

---

*Application developed to enhance interactive experience in museum exhibitions about 19th century transportation history.*