import React, { forwardRef } from 'react';
import { SHAPES, getShapeElement, getTextPosition } from '../utils/shapes.jsx';

const SVGCanvas = forwardRef(({ design }, ref) => {
  const shape = SHAPES[design.shape];
  const textPos = getTextPosition(design.shape, design);
  
  if (!shape) return null;

  return (
    <div 
      ref={ref}
      className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200"
      style={{ width: '400px', height: '320px' }}
    >
      <svg
        viewBox={shape.viewBox}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {getShapeElement(design.shape, design)}
        
        <text
          x={textPos.x}
          y={textPos.y}
          fontSize={design.fontSize}
          fontWeight={design.fontWeight}
          fill={design.textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Inter, system-ui, sans-serif"
          filter="url(#shadow)"
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {design.text || 'Tu texto aquí'}
        </text>
      </svg>
    </div>
  );
});

SVGCanvas.displayName = 'SVGCanvas';

export default SVGCanvas;
