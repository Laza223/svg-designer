import React from 'react';

export const SHAPES = {
  rectangle: {
    name: 'Rectángulo',
    viewBox: '0 0 300 200',
    element: (props) => (
      <rect 
        x="20" 
        y="20" 
        width="260" 
        height="160" 
        rx="8"
        {...props}
      />
    )
  },
  square: {
    name: 'Cuadrado',
    viewBox: '0 0 200 200',
    element: (props) => (
      <rect 
        x="20" 
        y="20" 
        width="160" 
        height="160" 
        rx="8"
        {...props}
      />
    )
  },
  circle: {
    name: 'Círculo',
    viewBox: '0 0 200 200',
    element: (props) => (
      <circle 
        cx="100" 
        cy="100" 
        r="80"
        {...props}
      />
    )
  },
  triangle: {
    name: 'Triángulo',
    viewBox: '0 0 200 200',
    element: (props) => (
      <polygon 
        points="100,30 170,150 30,150"
        {...props}
      />
    )
  },
  hexagon: {
    name: 'Hexágono',
    viewBox: '0 0 200 200',
    element: (props) => (
      <polygon 
        points="100,20 160,55 160,125 100,160 40,125 40,55"
        {...props}
      />
    )
  },
  star: {
    name: 'Estrella',
    viewBox: '0 0 200 200',
    element: (props) => (
      <polygon 
        points="100,20 120,70 170,70 130,110 145,160 100,130 55,160 70,110 30,70 80,70"
        {...props}
      />
    )
  }
};

export const getShapeElement = (shapeType, design) => {
  const shape = SHAPES[shapeType];
  if (!shape) return null;

  const shapeProps = {
    fill: design.backgroundColor,
    stroke: design.showStroke ? design.strokeColor : 'none',
    strokeWidth: design.showStroke ? design.strokeWidth : 0
  };

  return shape.element(shapeProps);
};

export const getTextPosition = (shapeType, design) => {
  const baseX = design.textPosition.x;
  const baseY = design.textPosition.y;
  
  switch (shapeType) {
    case 'rectangle':
      return { x: baseX * 3, y: baseY * 2 };
    case 'square':
      return { x: baseX * 2, y: baseY * 2 };
    case 'circle':
    case 'triangle':
    case 'hexagon':
    case 'star':
    default:
      return { x: baseX * 2, y: baseY * 2 };
  }
};
