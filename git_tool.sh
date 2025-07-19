#!/bin/bash
# chmod +x git_tool.sh
# ./git_tool.sh

echo "🔐 GIT SAFETY TOOLKIT"
echo "¿Qué quieres hacer?"
echo "1. Hacer respaldo rápido (commit)"
echo "2. Crear rama de prueba"
echo "3. Restaura al último commit de la rama actual."
echo "4. Borrar rama de prueba y volver a main"
echo "5. Salir"
echo "6. Fusionar rama actual a main"
echo "7. Ver commits exclusivos de la rama actual"
echo "8. Cambiar de rama"
echo "9. Subir cambios de la rama actual al repositorio remoto"
echo "10. Ver commits del repositorio remoto en la rama actual"
read -p "Opción: " opcion

case $opcion in
  1)
    read -p "📝 Mensaje del commit (Enter para usar automático): " mensaje
    if [ -z "$mensaje" ]; then
      mensaje=$(date "+Respaldo automático %Y-%m-%d %H:%M")
    fi
    git add .
    git commit -m "$mensaje"
    echo "✅ Respaldo creado con mensaje: $mensaje"
    ;;
  2)
    read -p "Nombre de la nueva rama: " rama
    rama_sin_espacios=$(echo "$rama" | tr ' ' '-')
    git checkout -b "$rama_sin_espacios"
    echo "✅ Rama '$rama_sin_espacios' creada y cambiada"
    ;;
  3)
    rama_actual=$(git rev-parse --abbrev-ref HEAD)
    echo "📍 Estás en la rama: $rama_actual"
    git reset --hard HEAD
    git clean -fd
    echo "🔄 Restaurado al último commit HEAD y archivos nuevos eliminados"
    ;;
  4)
    echo "📋 Ramas disponibles:"
    git branch
    echo
    read -p "🔻 Ingresa el nombre de la rama a borrar: " rama
    rama_actual=$(git rev-parse --abbrev-ref HEAD)

    if [ "$rama_actual" = "$rama" ]; then
      echo "⚠️ Estás actualmente en '$rama'. Se intentará cambiar a 'main'..."
      git checkout main || exit 1
    fi

    if git rev-parse --verify "$rama" >/dev/null 2>&1; then
      git branch -D "$rama"
      echo "🧹 Rama '$rama' eliminada y estás de vuelta en main"
    else
      echo "❌ La rama '$rama' no existe"
    fi
    ;;
  5)
    echo "👋 Saliendo..."
    ;;
  6)
    rama_actual=$(git rev-parse --abbrev-ref HEAD)
    echo "📍 Estás en la rama: $rama_actual"
    if [ "$rama_actual" != "main" ]; then
      git checkout main || exit 1
      git merge "$rama_actual"
      echo "✅ Cambios de '$rama_actual' fusionados en 'main'"
    else
      echo "⚠️ Ya estás en 'main', no hay rama que fusionar."
    fi
    ;;
  7)
    rama_actual=$(git rev-parse --abbrev-ref HEAD)
    if [ "$rama_actual" = "main" ]; then
      echo "📍 Estás en 'main'. Mostrando commits de 'main':"
      git log main --oneline
    else
      echo "📍 Commits exclusivos en '$rama_actual' (no presentes en main):"
      git log main.."$rama_actual" --oneline
    fi
    ;;
  8)
    echo "📋 Ramas disponibles:"
    git branch
    echo
    read -p "🔁 Ingresa el nombre de la rama a la que quieres cambiar: " nueva_rama
    if git rev-parse --verify "$nueva_rama" >/dev/null 2>&1; then
      git checkout "$nueva_rama"
      echo "✅ Cambiado a la rama '$nueva_rama'"
    else
      echo "❌ La rama '$nueva_rama' no existe"
    fi
    ;;
  9)
    rama_actual=$(git rev-parse --abbrev-ref HEAD)
    echo "🚀 Subiendo la rama '$rama_actual' al repositorio remoto..."
    git push origin "$rama_actual"
    if [ $? -eq 0 ]; then
      echo "✅ Cambios de '$rama_actual' subidos correctamente a origin/$rama_actual"
    else
      echo "❌ Error al hacer push. Verifica la configuración del remoto o los permisos."
    fi
    ;;
  10)
    rama_actual=$(git rev-parse --abbrev-ref HEAD)
    echo "📡 Obteniendo commits de la rama remota origin/$rama_actual..."
    git fetch origin
    if git show-ref --verify --quiet refs/remotes/origin/"$rama_actual"; then
      git log origin/"$rama_actual" --oneline
    else
      echo "❌ La rama remota 'origin/$rama_actual' no existe."
    fi
    ;;
  *)
    echo "❌ Opción no válida"
    ;;
esac 