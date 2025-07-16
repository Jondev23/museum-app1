# Fuentes del Proyecto Museum Kutschen

## ⚠️ FUENTES REQUERIDAS DEL CLIENTE

Para que la aplicación use las fuentes exactas del diseño, necesitas obtener estos archivos del cliente y colocarlos en esta carpeta (`/public/fonts/`):

### Tisa Pro (Serif - Para títulos principales)
- **TisaPro-Regular.woff2** y **TisaPro-Regular.woff**
- **TisaPro-Bold.woff2** y **TisaPro-Bold.woff**
- **TisaPro-Italic.woff2** y **TisaPro-Italic.woff**
- **TisaPro-BoldItalic.woff2** y **TisaPro-BoldItalic.woff**

### Tisa Sans Pro (Sans-serif - Para subtítulos y UI)
- **TisaSansPro-Regular.woff2** y **TisaSansPro-Regular.woff**
- **TisaSansPro-Bold.woff2** y **TisaSansPro-Bold.woff**

## 📁 Cómo obtener las fuentes:

1. **Contacta al cliente** para obtener los archivos de fuente
2. **Verifica la licencia** - asegúrate de tener permisos para usar las fuentes
3. **Coloca los archivos** en esta carpeta (`/public/fonts/`)
4. **Reinicia el servidor** - las fuentes se cargarán automáticamente

## 🎯 Estado actual:

- ✅ **Configuración CSS**: Lista y esperando los archivos
- ⚠️ **Archivos de fuente**: Pendientes del cliente
- ✅ **Fuentes de respaldo**: Activas (Playfair Display + Source Sans Pro)

## 💡 Mientras tanto:

La aplicación usa fuentes de respaldo similares que se ven bien:
- **Tisa Pro** → **Playfair Display** (Google Fonts)
- **Tisa Sans Pro** → **Source Sans Pro** (Google Fonts)

Las fuentes están definidas en `/styles/fonts.css` y se cargan automáticamente.
Si las fuentes no están disponibles, el sistema utilizará fuentes de respaldo:
- Tisa Pro → Times New Roman, serif
- Tisa Sans Pro → Arial, sans-serif

## Instalación:

1. Obtén los archivos de fuente .woff2 y .woff
2. Colócalos en esta carpeta (/public/fonts/)
3. Las fuentes se cargarán automáticamente

Actualmente configurado en:
- StartScreen.js (título principal, subtítulo, texto del cuerpo)
