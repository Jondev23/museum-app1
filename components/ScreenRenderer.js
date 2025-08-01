// ScreenRenderer.js
// Este componente renderiza las pantallas sin el sistema de animaciones de index.js

import React from 'react';
import { TRANSITION_CONFIG } from '../utils/animations';

// Componente que renderiza pantallas sin animaciones del sistema en index.js
const ScreenRenderer = ({ currentScreen, Component }) => {
  return (
    <div
      key={currentScreen}
      className="fixed inset-0"
      style={{ zIndex: TRANSITION_CONFIG.Z_INDEX.CONTENT }}
    >
      <Component />
    </div>
  );
};

export default ScreenRenderer;
