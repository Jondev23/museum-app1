# Gestión de Contenidos - Etiquetas HTML

## Resumen de cambios implementados

Se ha añadido soporte para etiquetas HTML en los títulos del sistema de kiosco, permitiendo un mayor control sobre el formato y presentación del texto.

## Etiquetas HTML soportadas

### 1. Etiquetas `<br>` - Saltos de línea
- **Propósito**: Crear saltos de línea en los títulos
- **Uso**: `<br>` o `<br/>`
- **Ejemplo**: `"title": "Primera línea<br>Segunda línea"`

### 2. Etiquetas `<b>` - Texto en negrita  
- **Propósito**: Destacar partes específicas del texto en negrita
- **Uso**: `<b>texto</b>`
- **Ejemplo**: `"title": "<b>Texto importante</b> texto normal"`

### 3. Combinación de etiquetas
- **Uso**: Se pueden combinar ambas etiquetas
- **Ejemplo**: `"title": "<b>Título Principal</b><br>Subtítulo normal"`

## Retrocompatibilidad

El sistema mantiene retrocompatibilidad con:
- **Patrón anterior**: Textos que usan ` / ` para saltos de línea siguen funcionando
- **Texto simple**: Textos sin etiquetas HTML funcionan normalmente

## Archivos afectados

### Componentes actualizados:
- `StartScreenTitle.js` - Títulos de pantalla de inicio
- `QuestionTitle.js` - Títulos de preguntas
- `FeedbackTitle.js` - Títulos de pantalla de retroalimentación
- `ResultsTitle.js` - Títulos de pantalla de resultados
- `ResultsScoreText.js` - Texto de puntuación
- `ScreensaverTitle.js` - Títulos de screensaver
- `LanguageTitle.js` - Títulos del selector de idioma

### Archivo utilitario:
- `utils/textProcessor.js` - Función de procesamiento centralizada

## Ejemplos de uso en JSON

### Antes (método anterior aún soportado):
```json
{
  "title": "Distanzen / des Reisens",
  "question": "Pregunta larga / con salto de línea"
}
```

### Ahora (nuevos métodos):
```json
{
  "title": "<b>Distanzen</b><br>des Reisens",
  "subtitle": "Wie schnell war das <b>eigentlich</b>?",
  "question": "<b>Wie schnell</b> fuhren Kutschen<br>typischerweise auf Landstraßen?"
}
```

### Ejemplos implementados en el proyecto:

#### Kiosk 1 (Alemán):
```json
{
  "title": "<b>Distanzen</b><br>des Reisens",
  "question": "<b>Wie viele Kilometer</b><br>konnte eine Postkutsche durchschnittlich an einem Tag zurücklegen?"
}
```

#### Kiosk 1 (Inglés):
```json
{
  "title": "<b>Distances</b><br>of Travel", 
  "question": "<b>How many kilometers</b><br>could a mail coach travel on average per day?"
}
```

#### Kiosk 2 (Alemán):
```json
{
  "title": "<b>Geschwindigkeiten</b><br>im 19. Jahrhundert",
  "subtitle": "Wie schnell war das <b>eigentlich</b>?",
  "question": "<b>Wie schnell</b> fuhren Kutschen<br>typischerweise auf Landstraßen?"
}
```

### Combinaciones complejas:
```json
{
  "title": "<b>Texto en negrita</b><br>Línea normal<br><b>Otra línea en negrita</b>",
  "subtitle": "Texto con <b>palabras destacadas</b> en el medio"
}
```

## Implementación técnica

### Función principal: `processTextWithHTML()`
- Procesa retrocompatibilidad con patrón ` / `
- Convierte etiquetas `<br>` en elementos React `<br />`
- Convierte etiquetas `<b>` en elementos `<span>` con `fontWeight: 'bold'`
- Retorna elementos React JSX válidos

### Integración:
Todos los componentes de título ahora importan y usan:
```javascript
import { processTextWithHTML } from '../../utils/textProcessor';

// En el render:
{processTextWithHTML(titleText)}
```

## Próximos pasos

El sistema está preparado para expandir a otras etiquetas HTML como:
- `<i>` para texto en cursiva
- `<u>` para texto subrayado
- `<span>` con estilos personalizados

## Pruebas recomendadas

1. Verificar que los títulos con `<br>` se muestren en múltiples líneas
2. Confirmar que el texto con `<b>` aparezca en negrita
3. Comprobar que el patrón anterior ` / ` siga funcionando
4. Probar combinaciones de ambas etiquetas
5. Verificar que el texto sin etiquetas se muestre normalmente
