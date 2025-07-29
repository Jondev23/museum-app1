# Instructions for Generating the .EXE File

## Configuration Completed

The application has been configured to work as a **normal desktop application** instead of a kiosk:

### Changes Made:

1. **Window Configuration (1920x1080)**:
   - Fixed size: 1920x1080 pixels
   - Kiosk mode disabled
   - Resizable, minimizable and maximizable window
   - Title bar and menus enabled

2. **Desktop Features**:
   - Standard application menu
   - Normal keyboard shortcuts (Alt+F4, F11, etc.)
   - Inactivity timer disabled
   - More flexible navigation

3. **Improved Build Configuration**:
   - NSIS installer with customizable options
   - Portable version (direct executable .exe)
   - Custom icons (if available)

## Commands to Generate the .EXE

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile for Windows (Installer + Portable)
```bash
npm run dist-win
```

### 3. Portable Version Only
```bash
npm run dist-win-portable
```

### 4. Compile without Packaging (for testing)
```bash
npm run pack-win
```

## Generated Files

Files will be generated in the `dist/` folder:

- **Installer**: `Museum Kutschen App Setup x.x.x.exe`
- **Portable**: `Museum Kutschen App x.x.x.exe`
- **Unpacked folder**: `win-unpacked/` (for testing)
- **Working command**: `npm run package` (generates executable application)

## Development and Testing

### Run in Development Mode
```bash
npm run dev
```

### Generate Final Application (RECOMMENDED)
```bash
npm run package
```
Then run from: `dist/Museum Kutschen App-win32-x64/Museum Kutschen App.exe`

## Important Notes

1. **System Requirements**: Windows 7/8/10/11 (64-bit)
2. **Screen Size**: Optimized for 1920x1080
3. **No Kiosk Mode**: The application works as normal desktop software
4. **Navigation**: Allows Alt+Tab, Alt+F4, and other standard Windows shortcuts

## Troubleshooting

- If the build fails, verify that `next build` works correctly
- Ensure all dependencies are installed
- Check that there are no errors in the console during development

## Additional Customization

To customize icons or other options, edit the `build` section in `package.json`.
