# Museum Kutschen Kiosk App - Installation Guide

## System Requirements
- Windows 10/11
- Web browser (Chrome, Edge, or Firefox)
- At least 4GB RAM
- 1GB free disk space

## Installation Steps

### 1. Extract Files
Extract all files from `Museum-Kutschen-Kiosk-v1.1-EN.zip` to a folder on your computer.

### 2. Required Files
Make sure these files are present:
- `out/` folder (contains the compiled application)
- `server.js` (local web server)
- `start-kiosk.bat` (application launcher)
- `package.json` (application configuration)

### 3. Launch Application
**Double-click `start-kiosk.bat`** to start the application automatically.

The script will:
- Start the local web server
- Open the browser in kiosk mode
- Display the museum application

### 4. Manual Start (Alternative)
If the automatic start doesn't work:
1. Open Command Prompt
2. Navigate to the application folder
3. Run: `node server.js`
4. Open browser and go to: `http://localhost:3000`

## Admin Panel Access
1. Click the four corners of the screen in sequence: **top-left → top-right → bottom-right → bottom-left**
2. Enter password: `museum2024`
3. Select the desired kiosk configuration

## Content Configuration
Edit JSON files in `out/content/` folder:
- `kiosk1.json` - Carriage history content
- `kiosk2.json` - Additional carriage information  
- `kiosk3.json` - Extended museum content

## Troubleshooting

### Browser doesn't open automatically
- Make sure Chrome or Edge is installed
- Try running `start-kiosk.bat` as administrator

### Server won't start
- Check if port 3000 is available
- Restart your computer and try again

### Content not loading
- Verify all files were extracted properly
- Check that `out/` folder contains all subfolders

## Support
For technical support, contact the development team with details about your system and the specific issue encountered.

---
**Version:** 1.1  
**Last Updated:** July 2025
