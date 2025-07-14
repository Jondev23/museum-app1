# Instrucciones de Desarrollo - Museum Kiosk App

## ⚠️ IMPORTANTE: Cómo evitar el bloqueo de pantalla

### Problema conocido
Si ejecutas `npm run dev` y Next.js no está listo, la app puede entrar en modo kiosco y bloquear la pantalla.

### Solución 1: Usar el script seguro (RECOMENDADO)
```bash
./start-dev.sh
```

### Solución 2: Pasos manuales (más control)
```bash
# Terminal 1: Iniciar Next.js
npm run next-dev

# Esperar a ver el mensaje "Ready - started server on 0.0.0.0:3000"

# Terminal 2: Iniciar Electron
npm run electron-dev-manual
```

## 🔧 Atajos de teclado en desarrollo

- **Ctrl+Q**: Salir de la aplicación
- **Ctrl+R**: Recargar la aplicación
- **F12**: Abrir DevTools
- **Escape**: Salir de pantalla completa

## 🚀 Modo Producción

```bash
# Construir la aplicación
npm run build

# Crear ejecutable
npm run build-electron
```

## 🖥️ Configurar diferentes kioscos

```bash
# Kiosk 1 (Historia general)
npm run dev:kiosk1

# Kiosk 2 (Lujo y aristocracia)
npm run dev:kiosk2

# Kiosk 3 (Artesanía y construcción)
npm run dev:kiosk3
```

## 📝 Editar contenido

1. Edita los archivos JSON en la carpeta `content/`
2. Los cambios se reflejan automáticamente al recargar
3. Estructura:
   - `kiosk1.json` - Historia general de carruajes
   - `kiosk2.json` - Carruajes de lujo
   - `kiosk3.json` - Construcción y artesanía

## 🛠️ Solución de problemas

### La app se bloquea en pantalla completa
1. Usa **Ctrl+Q** para salir
2. Si no funciona, usa **Cmd+Tab** (Mac) o **Alt+Tab** (Windows) para cambiar a otra app
3. Como último recurso, reinicia el sistema

### Next.js no inicia
```bash
# Limpiar caché
rm -rf .next
npm install
npm run next-dev
```

### Errores de TypeScript
```bash
npm run type-check
```

### Limpiar completamente el proyecto
```bash
rm -rf node_modules .next out dist
npm install
```
