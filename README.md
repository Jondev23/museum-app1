# Museum Kutschen Kiosk App

Eine interaktive Kiosk-Anwendung für die Kutschen-Ausstellung im Museum. Die App bietet ein unterhaltsames Quiz mit fünf Fragen zu historischen Kutschen in deutscher und englischer Sprache.

## Features

- **Vollscreen Kiosk-Modus** - Läuft ohne Browser-Chrome im Vollbildmodus
- **Offline-Funktionalität** - Benötigt keine Internetverbindung
- **Mehrsprachig** - Deutsch und Englisch mit dynamischem Sprachwechsel
- **Interaktive Animationen** - Smooth Transitions und Touch-Feedback
- **Inaktivitäts-Timer** - Kehrt nach 3 Minuten automatisch zum Screensaver zurück
- **Anpassbarer Inhalt** - Verschiedene Quiz-Inhalte für verschiedene Kiosk-Stationen
- **Touch-optimiert** - Perfekt für Touchscreen-Displays

## Bildschirme

1. **Screensaver** - Animierte Startbildschirm mit Touch-Aufforderung
2. **Startbildschirm** - Willkommen mit Swipe-Navigation
3. **Quiz** - 5 zufällige Fragen mit Multiple-Choice-Antworten
4. **Feedback** - Sofortige Rückmeldung nach jeder Antwort
5. **Ergebnisse** - Zusammenfassung mit Score und Neustart-Option
6. **Sprachauswahl** - Overlay für Sprachwechsel

## Installation

### Voraussetzungen
- Node.js 16 oder höher
- npm oder yarn

## Desarrollo

### ⚠️ IMPORTANTE: Evitar bloqueo de pantalla

**Para evitar que la app se bloquee en modo kiosco durante el desarrollo:**

#### Opción 1: Script automatizado (RECOMENDADO)
```bash
./start-dev.sh
```

#### Opción 2: Pasos manuales
```bash
# Terminal 1: Iniciar Next.js primero
npm run next-dev

# Esperar el mensaje "Ready - started server"

# Terminal 2: Iniciar Electron
npm run electron-dev-manual
```

### Atajos de desarrollo
- **Ctrl+Q**: Salir de la aplicación
- **Ctrl+R**: Recargar
- **F12**: DevTools
- **Escape**: Salir de pantalla completa

Ver [DEVELOPMENT.md](DEVELOPMENT.md) para instrucciones detalladas.

### Setup
```bash
# Repository klonen oder entpacken
cd museum-kutschen-app

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Production Build
```bash
# Next.js App bauen
npm run build

# Electron App erstellen
npm run build-electron

# Distributionspaket erstellen
npm run dist
```

## Konfiguration

### Kiosk-spezifische Inhalte

Die App unterstützt verschiedene Kiosk-Konfigurationen durch JSON-Dateien im `content/` Ordner:

- `kiosk1.json` - Allgemeine Kutschen-Geschichte
- `kiosk2.json` - Luxuskutschen und Adel
- `kiosk3.json` - Kutschenbau und Handwerk

### Inhalt anpassen

Um den Inhalt zu ändern, bearbeiten Sie die entsprechende JSON-Datei:

```json
{
  "de": {
    "startScreen": {
      "title": "Ihr Titel",
      "subtitle": "Ihr Untertitel",
      "introText": "Ihr Einführungstext"
    },
    "questions": [
      {
        "id": "q1",
        "question": "Ihre Frage?",
        "answers": ["Antwort 1", "Antwort 2", "Antwort 3"],
        "correctAnswer": 0,
        "explanation": "Ihre Erklärung"
      }
    ]
  }
}
```

### Neuen Kiosk hinzufügen

1. Erstellen Sie eine neue JSON-Datei: `content/kiosk4.json`
2. Kopieren Sie die Struktur von einer bestehenden Datei
3. Passen Sie Inhalte und Fragen an
4. Die App erkennt automatisch neue Kiosk-Dateien

## Deployment

### Lokaler Kiosk-Computer
1. App bauen: `npm run build-electron`
2. Installationsdatei auf Kiosk-Computer kopieren
3. App installieren und im Autostart einrichten

### Kiosk-Modus aktivieren
Die App startet automatisch im Kiosk-Modus (Vollbild, keine Navigation).

Im Entwicklungsmodus können Sie mit `Ctrl+Q` die App beenden.

## Technische Details

### Verwendete Technologien
- **Electron** - Desktop-App Framework
- **Next.js** - React Framework
- **Framer Motion** - Animationen
- **Tailwind CSS** - Styling
- **React Context** - State Management

### Projektstruktur
```
museum-kutschen-app/
├── content/           # Kiosk-spezifische JSON Inhalte
├── components/        # React Komponenten
├── context/          # React Context für State Management
├── electron/         # Electron Hauptprozess
├── pages/           # Next.js Seiten
├── styles/          # CSS Styles
└── public/          # Statische Assets
```

### Anpassung der Inaktivitätszeit
Standard: 3 Minuten. Ändern in `context/AppContext.js`:
```javascript
timer = setTimeout(() => {
  goToScreensaver();
}, 3 * 60 * 1000); // 3 Minuten in Millisekunden
```

## Wartung

### Fragen hinzufügen/ändern
1. Bearbeiten Sie die entsprechende JSON-Datei im `content/` Ordner
2. App neu starten (im Kiosk-Modus)

### Sprachen hinzufügen
1. Erweitern Sie die JSON-Struktur um neue Sprachcodes
2. Fügen Sie Sprachoptionen in `LanguageSelector.js` hinzu

### Styling anpassen
- Farben: `tailwind.config.js`
- Komponenten-Styles: Jeweilige Component-Dateien
- Globale Styles: `styles/globals.css`

## Troubleshooting

### App startet nicht
- Node.js Version prüfen (min. 16)
- `npm install` erneut ausführen
- Konsole auf Fehler prüfen

### Inhalt wird nicht geladen
- JSON-Syntax prüfen (online validator verwenden)
- Pfade in JSON überprüfen
- Browser-Konsole auf Fehler prüfen

### Touch funktioniert nicht
- Touchscreen-Treiber prüfen
- Mouse-Events als Fallback sind implementiert

## Support

Bei Problemen oder Fragen:
1. Dokumentation prüfen
2. Log-Dateien kontrollieren
3. Support-Team kontaktieren

## Lizenz

MIT License - Siehe LICENSE Datei für Details.
