import { useState, useCallback } from 'react';

const INITIAL_STATE = {
  text: 'Mi Diseño',
  textColor: '#2563eb',
  backgroundColor: '#f8fafc',
  shape: 'rectangle',
  fontSize: 24,
  fontWeight: 'normal',
  textPosition: { x: 50, y: 50 },
  strokeColor: '#1e293b',
  strokeWidth: 2,
  showStroke: false
};

export const useDesignState = () => {
  const [design, setDesign] = useState(INITIAL_STATE);

  const updateDesign = useCallback((updates) => {
    setDesign(prev => ({ ...prev, ...updates }));
  }, []);

  const resetDesign = useCallback(() => {
    setDesign(INITIAL_STATE);
  }, []);

  const updateTextPosition = useCallback((position) => {
    setDesign(prev => ({
      ...prev,
      textPosition: { ...prev.textPosition, ...position }
    }));
  }, []);

  return {
    design,
    updateDesign,
    resetDesign,
    updateTextPosition
  };
};
