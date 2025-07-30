# 🏛️ Guía para Construir el Archivo .exe

## 📦 Construcción Rápida

### Opción 1: Script Automático (Recomendado)
```bash
./build-exe.sh
```

### Opción 2: Comandos Manuales
```bash
# Instalar dependencias
npm install

# Construir y generar .exe portable
npm run build-exe-portable
```

## 📁 Ubicación del Archivo

El archivo .exe se generará directamente en:
- **macOS/Linux**: `~/Downloads/`
- **Nombre del archivo**: `Museum Kutschen App-1.0.0-portable.exe`

## 🎯 Para el Cliente

### Requisitos del Sistema
- Windows 7 o superior
- Arquitectura x64 (64-bit)
- No requiere instalación adicional

### Instrucciones de Uso
1. Descargar el archivo `.exe`
2. Hacer doble clic para ejecutar
3. La aplicación se abrirá en modo kiosk automáticamente

## 🔧 Opciones de Construcción Disponibles

| Comando | Descripción | Tipo de Archivo |
|---------|-------------|-----------------|
| `npm run build-exe` | Ejecutable estándar | .exe con instalador |
| `npm run build-exe-portable` | **Recomendado** | .exe portable |
| `npm run dist-win` | Ambas versiones | .exe + portable |

## 🏗️ Proceso de Construcción

1. **Next.js Build**: Optimiza la aplicación React
2. **Electron Packaging**: Empaqueta en aplicación de escritorio
3. **Windows Binary**: Genera el archivo .exe
4. **Output**: Guarda en carpeta de Descargas

## 🐛 Solución de Problemas

### Error: "No se encuentra electron-builder"
```bash
npm install --save-dev electron-builder
```

### Error: "Build failed"
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build-exe-portable
```

### El archivo no aparece en Descargas
- Verificar permisos de la carpeta
- Buscar en `~/Downloads/` manualmente
- Revisar logs de construcción para errores

## 📋 Checklist para Entrega al Cliente

- [ ] Archivo .exe generado correctamente
- [ ] Archivo es portable (no requiere instalación)
- [ ] Tamaño del archivo es razonable (~200-500MB)
- [ ] Probar en máquina Windows si es posible
- [ ] Incluir instrucciones básicas de uso

## 📞 Soporte

Si tienes problemas con la construcción:
1. Verificar que Node.js esté actualizado (v18+)
2. Verificar que todas las dependencias estén instaladas
3. Ejecutar `npm run build` primero para verificar la aplicación
4. Revisar logs de error en la terminal
