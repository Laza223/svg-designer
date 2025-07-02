import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [text, setText] = useState("Tu texto");
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#f2f2f2");
  const [shape, setShape] = useState("cuadrado");
  const svgRef = useRef(null);

  const exportAsImage = () => {
    html2canvas(svgRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "remera.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const renderShape = () => {
    switch (shape) {
      case "cuadrado":
        return <rect width="200" height="200" fill={bgColor} />;
      case "circulo":
        return <circle cx="100" cy="100" r="100" fill={bgColor} />;
      case "rectangulo":
        return <rect x="40" y="10" width="120" height="180" fill={bgColor} />;
      case "triangulo":
        return <polygon points="100,40 170,160 30,160" fill={bgColor} />;
      default:
        return <rect width="200" height="200" fill={bgColor} />;
    }
  };

  const getDisplayText = () => {
    const maxLength = 16;
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div ref={svgRef} className="w-64 h-64 relative bg-white p-4 shadow-lg">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {renderShape()}
          <text x="100" y="110" fontSize="20" fill={textColor} textAnchor="middle" alignmentBaseline="middle" style={{ pointerEvents: 'none', userSelect: 'none' }}>
            {getDisplayText()}
          </text>
        </svg>
      </div>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <label className="flex flex-col items-center">
          Forma:
          <select value={shape} onChange={e => setShape(e.target.value)} className="border p-2 rounded mt-1">
            <option value="cuadrado">Cuadrado</option>
            <option value="circulo">Círculo</option>
            <option value="rectangulo">Rectángulo</option>
            <option value="triangulo">Triángulo</option>
          </select>
        </label>
        <label className="flex flex-col items-center">
          Color de fondo:
          <input
            type="color"
            value={bgColor}
            onChange={e => setBgColor(e.target.value)}
            className="w-10 h-10 border-2 border-black rounded-full mt-1"
          />
        </label>
        <label className="flex flex-col items-center">
          Color del texto:
          <input
            type="color"
            value={textColor}
            onChange={e => setTextColor(e.target.value)}
            className="w-10 h-10 border-2 border-black rounded-full mt-1"
          />
        </label>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="border p-2 rounded"
          placeholder="Escribí tu texto"
        />
        <button
          onClick={exportAsImage}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Exportar imagen
        </button>
      </div>
    </div>
  );
}
