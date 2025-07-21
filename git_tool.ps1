# PowerShell Git Safety Toolkit
# Para ejecutar: .\git_tool.ps1
Write-Host '🔐 GIT SAFETY TOOLKIT' -ForegroundColor Cyan
Write-Host 'Que quieres hacer?' -ForegroundColor Yellow
Write-Host '1. Hacer respaldo rapido (commit)' -ForegroundColor White
Write-Host '2. Crear rama de prueba' -ForegroundColor White
Write-Host '3. Restaura al ultimo commit de la rama actual' -ForegroundColor White
Write-Host '4. Borrar rama de prueba y volver a main' -ForegroundColor White
Write-Host '5. Salir' -ForegroundColor White
Write-Host '6. Fusionar rama actual a main' -ForegroundColor White
Write-Host '7. Ver commits exclusivos de la rama actual' -ForegroundColor White
Write-Host '8. Cambiar de rama' -ForegroundColor White
Write-Host '9. Subir cambios de la rama actual al repositorio remoto' -ForegroundColor White
Write-Host '10. Ver commits del repositorio remoto en la rama actual' -ForegroundColor White

$opcion = Read-Host 'Opcion'

if ($opcion -eq '1') {
    $mensaje = Read-Host 'Mensaje del commit (Enter para usar automatico)'
    if ([string]::IsNullOrWhiteSpace($mensaje)) {
        $mensaje = 'Respaldo automatico ' + (Get-Date -Format 'yyyy-MM-dd HH:mm')
    }
    git add .
    git commit -m $mensaje
    Write-Host ('Respaldo creado con mensaje: ' + $mensaje) -ForegroundColor Green
}
elseif ($opcion -eq '2') {
    $rama = Read-Host 'Nombre de la nueva rama'
    $rama_sin_espacios = $rama -replace ' ', '-'
    git checkout -b $rama_sin_espacios
    Write-Host ('Rama ' + $rama_sin_espacios + ' creada y cambiada') -ForegroundColor Green
}
elseif ($opcion -eq '3') {
    $rama_actual = git rev-parse --abbrev-ref HEAD
    Write-Host ('Estas en la rama: ' + $rama_actual) -ForegroundColor Blue
    git reset --hard HEAD
    git clean -fd
    Write-Host 'Restaurado al ultimo commit HEAD y archivos nuevos eliminados' -ForegroundColor Green
}
elseif ($opcion -eq '4') {
    Write-Host 'Ramas disponibles:' -ForegroundColor Blue
    git branch
    Write-Host ''
    $rama = Read-Host 'Ingresa el nombre de la rama a borrar'
    $rama_actual = git rev-parse --abbrev-ref HEAD

    if ($rama_actual -eq $rama) {
        Write-Host ('Estas actualmente en ' + $rama + '. Se intentara cambiar a main...') -ForegroundColor Yellow
        git checkout main
        if ($LASTEXITCODE -ne 0) { 
            Write-Host 'Error al cambiar a main' -ForegroundColor Red
            return 
        }
    }

    $null = git rev-parse --verify $rama 2>$null
    if ($LASTEXITCODE -eq 0) {
        git branch -D $rama
        Write-Host ('Rama ' + $rama + ' eliminada y estas de vuelta en main') -ForegroundColor Green
    } else {
        Write-Host ('La rama ' + $rama + ' no existe') -ForegroundColor Red
    }
}
elseif ($opcion -eq '5') {
    Write-Host 'Saliendo...' -ForegroundColor Yellow
}
elseif ($opcion -eq '6') {
    $rama_actual = git rev-parse --abbrev-ref HEAD
    Write-Host ('Estas en la rama: ' + $rama_actual) -ForegroundColor Blue
    if ($rama_actual -ne 'main') {
        git checkout main
        if ($LASTEXITCODE -eq 0) {
            git merge $rama_actual
            Write-Host ('Cambios de ' + $rama_actual + ' fusionados en main') -ForegroundColor Green
        }
    } else {
        Write-Host 'Ya estas en main, no hay rama que fusionar' -ForegroundColor Yellow
    }
}
elseif ($opcion -eq '7') {
    $rama_actual = git rev-parse --abbrev-ref HEAD
    if ($rama_actual -eq 'main') {
        Write-Host 'Estas en main. Mostrando commits de main:' -ForegroundColor Blue
        git log main --oneline
    } else {
        Write-Host ('Commits exclusivos en ' + $rama_actual + ' (no presentes en main):') -ForegroundColor Blue
        git log ('main..' + $rama_actual) --oneline
    }
}
elseif ($opcion -eq '8') {
    Write-Host 'Ramas disponibles:' -ForegroundColor Blue
    git branch
    Write-Host ''
    $nueva_rama = Read-Host 'Ingresa el nombre de la rama a la que quieres cambiar'
    $null = git rev-parse --verify $nueva_rama 2>$null
    if ($LASTEXITCODE -eq 0) {
        git checkout $nueva_rama
        Write-Host ('Cambiado a la rama ' + $nueva_rama) -ForegroundColor Green
    } else {
        Write-Host ('La rama ' + $nueva_rama + ' no existe') -ForegroundColor Red
    }
}
elseif ($opcion -eq '9') {
    $rama_actual = git rev-parse --abbrev-ref HEAD
    Write-Host ('Subiendo la rama ' + $rama_actual + ' al repositorio remoto...') -ForegroundColor Blue
    git push origin $rama_actual
    if ($LASTEXITCODE -eq 0) {
        Write-Host ('Cambios de ' + $rama_actual + ' subidos correctamente a origin/' + $rama_actual) -ForegroundColor Green
    } else {
        Write-Host 'Error al hacer push. Verifica la configuracion del remoto o los permisos' -ForegroundColor Red
    }
}
elseif ($opcion -eq '10') {
    $rama_actual = git rev-parse --abbrev-ref HEAD
    Write-Host ('Obteniendo commits de la rama remota origin/' + $rama_actual + '...') -ForegroundColor Blue
    git fetch origin
    $null = git show-ref --verify --quiet ('refs/remotes/origin/' + $rama_actual) 2>$null
    if ($LASTEXITCODE -eq 0) {
        git log ('origin/' + $rama_actual) --oneline
    } else {
        Write-Host ('La rama remota origin/' + $rama_actual + ' no existe') -ForegroundColor Red
    }
}
else {
    Write-Host 'Opcion no valida' -ForegroundColor Red
}
