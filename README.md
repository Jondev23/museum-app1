# Museum Kutschen Interactive Desktop App

## 📋 Description

Interactive desktop application designed for a museum exhibition about **Kutschen** (historical horse-drawn carriages). The application allows visitors to participate in an interactive quiz about transportation history and travel distances in the 19th century. Runs as a standalone Windows desktop application with no browser dependencies.

## ✨ Key Features

### 🎮 User Experience
- **Interactive Quiz**: 5 random questions about horse-drawn carriages and historical transportation
- **Multi-language Support**: German and English language options
- **Screensaver Mode**: Automatically activates after 3 minutes of inactivity
- **Desktop Interface**: Optimized for desktop and touch devices
- **Standalone Application**: No browser or internet connection required

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

### System Requirements
- Windows 10/11 (64-bit)
- 4GB RAM minimum
- No additional software required

### Quick Start (End Users)
```bash
# Download and extract the ZIP file
# Navigate to "Museum Kutschen App-win32-x64" folder
# Double-click "Museum Kutschen App.exe"
# Application starts automatically in desktop mode
```

### Development Setup
```bash
# Prerequisites for developers
# Node.js (version 16 or higher)
# npm or yarn

# Clone the repository
git clone <repository-url>
cd museum-kutschen-app

# Install dependencies
npm install
```

### Available Scripts (Development)

```bash
# Development
npm run dev                 # Start application in development mode
npm run next-dev           # Next.js server only
npm run electron-dev       # Electron application only

# Production Build
npm run build              # Build Next.js static export
npm run package            # Create complete Electron application
npm run build-simple       # Alternative simple build

# Utilities
npm run lint               # Run linter
npm run type-check         # Check TypeScript types
```

## ⚙️ Configuration

### Desktop Application
The application runs as a standalone desktop app with:
1. Admin panel access via corner clicks (top-left → top-right → bottom-right)
2. Password: museum2025
3. Automatic kiosk detection and content loading

### Content Management
Content is dynamically loaded from JSON files in `out/content/`:
- `kiosk1.json` - General Kutschen History
- `kiosk2.json` - Luxury Carriages  
- `kiosk3.json` - Carriage Construction

### Electron Configuration
- **Development**: Windowed mode with DevTools
- **Production**: Fullscreen desktop application
- **Security**: Disabled web features, local file access enabled
- **Performance**: Optimized for 1920x1080 displays

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

### Desktop Mode Features
- Disabled dangerous keyboard shortcuts
- Prevention of external navigation
- Automatic inactivity screensaver
- Native desktop application performance
- Local file system access for content
- No internet connection required

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

*Desktop application developed to enhance interactive experience in museum exhibitions about 19th century transportation history. Version 2.0 - Desktop Edition.*