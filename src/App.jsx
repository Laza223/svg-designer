
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [text, setText] = useState("Tu texto");
  const [color, setColor] = useState("#000000");
  const svgRef = useRef(null);

  const exportAsImage = () => {
    html2canvas(svgRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "remera.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div ref={svgRef} className="w-64 h-64 relative bg-white p-4 shadow-lg">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect width="200" height="200" fill="#f2f2f2" rx="20" />
          <text x="100" y="100" fontSize="20" fill={color} textAnchor="middle">
            {text}
          </text>
        </svg>
      </div>
      <div className="mt-4 flex flex-col gap-2 items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded"
          placeholder="Escribí tu texto"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 border-2 border-black rounded-full"
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
