# Fuentes del Proyecto Museum Kutschen

## Fuentes requeridas:

### Tisa Pro
- **TisaPro-Regular.woff2** / **TisaPro-Regular.woff**
- **TisaPro-Bold.woff2** / **TisaPro-Bold.woff**
- **TisaPro-Italic.woff2** / **TisaPro-Italic.woff**
- **TisaPro-BoldItalic.woff2** / **TisaPro-BoldItalic.woff**

### Tisa Sans Pro
- **TisaSansPro-Regular.woff2** / **TisaSansPro-Regular.woff**
- **TisaSansPro-Bold.woff2** / **TisaSansPro-Bold.woff**

## Uso en el proyecto:

- **Tisa Pro**: Utilizada para títulos principales y texto del cuerpo
- **Tisa Sans Pro**: Utilizada para subtítulos y elementos sans-serif

## Configuración:

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
