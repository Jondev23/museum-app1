#!/bin/bash

# Script para construir el archivo .exe de la aplicación Museum Kutschen
# El archivo se generará directamente en la carpeta de Descargas

echo "🏛️  Construyendo Museum Kutschen App para Windows..."
echo "📁 El archivo .exe se generará en: ~/Downloads"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# Verificar que Next.js esté instalado
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx no está instalado. Instala Node.js primero."
    exit 1
fi

echo "🔧 Instalando dependencias si es necesario..."
npm install

echo ""
echo "🏗️  Construyendo la aplicación Next.js..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error durante la construcción de Next.js"
    exit 1
fi

echo ""
echo "📦 Generando archivo .exe portable para Windows..."
npm run build-exe-portable

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Construcción completada exitosamente!"
    echo "📁 El archivo .exe se encuentra en: ~/Downloads"
    echo "🎯 Busca un archivo como: Museum Kutschen App-1.0.0-portable.exe"
    echo ""
    echo "📋 Información para el cliente:"
    echo "   - El archivo es portable (no requiere instalación)"
    echo "   - Compatible con Windows x64"
    echo "   - Simplemente hacer doble clic para ejecutar"
    
    # Abrir la carpeta de Descargas
    echo ""
    echo "🔍 Abriendo carpeta de Descargas..."
    open ~/Downloads
else
    echo "❌ Error durante la generación del archivo .exe"
    exit 1
fi
