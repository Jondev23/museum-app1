#!/bin/bash

echo "🔄 Creando respaldo en GitHub..."
echo "================================="

# Agregar todos los cambios
echo "📦 Agregando archivos..."
git add .

# Verificar si hay cambios
if git diff --staged --quiet; then
    echo "✅ No hay cambios nuevos para respaldar"
    exit 0
fi

# Mostrar cambios
echo "📋 Cambios a respaldar:"
git status --short

# Solicitar mensaje de commit
echo ""
read -p "💬 Mensaje del commit (o Enter para usar mensaje automático): " commit_message

if [ -z "$commit_message" ]; then
    # Mensaje automático con fecha
    commit_message="🔄 Backup - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Hacer commit
echo "💾 Creando commit..."
git commit -m "$commit_message"

# Subir a GitHub
echo "⬆️  Subiendo a GitHub..."
git push

echo ""
echo "✅ Respaldo completado exitosamente!"
echo "🌐 Ver en: https://github.com/Jondev23/museum-app1"
