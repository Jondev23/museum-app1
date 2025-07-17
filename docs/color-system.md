# Sistema de Colores y Variables CSS

Este documento explica cómo usar el sistema de colores centralizado en la aplicación.

## Variables CSS Disponibles

### Colores Principales
- `--color-light-gray`: #D9D9D9 (texto principal)
- `--color-green`: #85AF8B (color de acento)

### Colores de Feedback
- `--color-feedback-correct`: #598364 (respuesta correcta)
- `--color-feedback-incorrect`: #A94930 (respuesta incorrecta)
- `--color-feedback-answer-bg`: #D9D9D9 (fondo de respuesta)
- `--color-feedback-answer-text`: #344243 (texto de respuesta)

### Colores del Sistema
- `--color-text-primary`: #D9D9D9 (texto principal)
- `--color-text-secondary`: #344243 (texto secundario)
- `--color-accent`: #85AF8B (color de acento)
- `--color-overlay`: rgba(0, 0, 0, 0.75) (overlay)

## Uso en JavaScript

```javascript
import { COLORS } from '../../utils/cssVariables';

// Uso directo
const style = {
  backgroundColor: COLORS.FEEDBACK_CORRECT,
  color: COLORS.TEXT_PRIMARY,
};

// En configuración
export const CONFIG = {
  COLORS: {
    CORRECT_BG: COLORS.FEEDBACK_CORRECT,
    INCORRECT_BG: COLORS.FEEDBACK_INCORRECT,
  },
};
```

## Uso en CSS/Tailwind

```css
/* CSS directo */
.my-class {
  background-color: var(--color-feedback-correct);
  color: var(--color-text-primary);
}

/* Clases de utilidad disponibles */
.bg-feedback-correct
.bg-feedback-incorrect
.bg-feedback-answer
.text-feedback-answer
.text-primary
.text-secondary
.text-accent
.border-primary
```

## Ventajas del Sistema

1. **Consistencia**: Todos los colores están centralizados
2. **Mantenibilidad**: Cambiar un color actualiza toda la aplicación
3. **Temas**: Fácil implementación de temas oscuros/claros
4. **Performance**: Variables CSS nativas son más rápidas que JS
5. **Reutilización**: Mismo color disponible en CSS y JS

## Mejores Prácticas

1. **Siempre usar variables**: No hardcodear colores hex
2. **Preferir CSS sobre JS**: Usar variables CSS cuando sea posible
3. **Nombres semánticos**: Usar nombres descriptivos, no colores
4. **Documentar cambios**: Actualizar esta documentación al agregar colores

## Ejemplo de Migración

### Antes (❌)
```javascript
const style = {
  backgroundColor: '#598364',
  color: '#D9D9D9',
  borderColor: '#A94930',
};
```

### Después (✅)
```javascript
import { COLORS } from '../../utils/cssVariables';

const style = {
  backgroundColor: COLORS.FEEDBACK_CORRECT,
  color: COLORS.TEXT_PRIMARY,
  borderColor: COLORS.FEEDBACK_INCORRECT,
};
```

## Agregar Nuevos Colores

1. Agregar la variable en `globals.css`:
```css
:root {
  --color-new-feature: #123456;
}
```

2. Agregar al utilitario en `utils/cssVariables.js`:
```javascript
export const COLORS = {
  NEW_FEATURE: useCSS('--color-new-feature'),
};
```

3. Opcional: Agregar clase de utilidad en `globals.css`:
```css
.bg-new-feature {
  background-color: var(--color-new-feature);
}
```
