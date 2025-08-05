import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

export default function App() {
  const [text, setText] = useState("Mi Etiqueta");
  const [subText, setSubText] = useState("");
  const [textColor, setTextColor] = useState("#2563eb");
  const [bgColor, setBgColor] = useState("#f8fafc");
  const [shape, setShape] = useState("rectangle");
  const [fontSize, setFontSize] = useState(24);
  const [subFontSize, setSubFontSize] = useState(16);
  const [userImage, setUserImage] = useState(null);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [imageSize, setImageSize] = useState(140);
  const [textPosition, setTextPosition] = useState({ x: 150, y: 80 });
  const [subTextPosition, setSubTextPosition] = useState({ x: 150, y: 120 });
  const [isDragging, setIsDragging] = useState(null);
  const [sheetRows, setSheetRows] = useState(3);
  const [sheetCols, setSheetCols] = useState(4);
  const [spacing, setSpacing] = useState(10);
  const [viewMode, setViewMode] = useState('single');
  
  const canvasRef = useRef(null);
  const sheetRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e, textType) => {
    if (viewMode !== 'single') return;
    e.preventDefault();
    setIsDragging(textType);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || viewMode !== 'single') return;
    
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - svgRect.left) / svgRect.width) * 300;
    const y = ((e.clientY - svgRect.top) / svgRect.height) * 200;
    
    if (isDragging === 'main') {
      setTextPosition({ x: Math.max(20, Math.min(280, x)), y: Math.max(20, Math.min(180, y)) });
    } else if (isDragging === 'sub') {
      setSubTextPosition({ x: Math.max(20, Math.min(280, x)), y: Math.max(20, Math.min(180, y)) });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const resetTextPositions = () => {
    setTextPosition({ x: 150, y: 80 });
    setSubTextPosition({ x: 150, y: 120 });
  };

  const exportAsImage = () => {
    const ref = viewMode === 'sheet' ? sheetRef : canvasRef;
    if (ref.current) {
      html2canvas(ref.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = viewMode === 'sheet' ? "plancha-etiquetas.png" : "etiqueta.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const exportAsSVG = () => {
    const ref = viewMode === 'sheet' ? sheetRef : canvasRef;
    if (ref.current) {
      const svgElement = ref.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        const link = document.createElement('a');
        link.download = viewMode === 'sheet' ? "plancha-etiquetas.svg" : "etiqueta.svg";
        link.href = svgUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(svgUrl);
      }
    }
  };

  const renderShape = () => {
    switch (shape) {
      case "rectangle":
        return <rect x="20" y="20" width="260" height="160" rx="8" fill={bgColor} />;
      case "square":
        return <rect x="70" y="20" width="160" height="160" rx="8" fill={bgColor} />;
      case "circle":
        return <circle cx="150" cy="100" r="80" fill={bgColor} />;
      case "triangle":
        return <polygon points="150,20 240,170 60,170" fill={bgColor} />;
      default:
        return <rect x="20" y="20" width="260" height="160" rx="8" fill={bgColor} />;
    }
  };

  const renderUserImage = () => {
    if (!userImage) return null;
    
    const imageProps = {
      href: userImage,
      opacity: imageOpacity,
      preserveAspectRatio: "xMidYMid meet"
    };

    switch (shape) {
      case "rectangle":
        return (
          <image 
            {...imageProps}
            x={20 + (260 - imageSize) / 2} 
            y={20 + (160 - imageSize * 0.65) / 2} 
            width={imageSize} 
            height={imageSize * 0.65} 
          />
        );
      case "square":
        return (
          <image 
            {...imageProps}
            x={70 + (160 - imageSize * 0.9) / 2} 
            y={20 + (160 - imageSize * 0.9) / 2} 
            width={imageSize * 0.9} 
            height={imageSize * 0.9} 
          />
        );
      case "circle":
        return (
          <image 
            {...imageProps}
            x={150 - (imageSize * 0.8) / 2} 
            y={100 - (imageSize * 0.8) / 2} 
            width={imageSize * 0.8} 
            height={imageSize * 0.8}
            clipPath="url(#circleClip)"
          />
        );
      case "triangle":
        return (
          <image 
            {...imageProps}
            x={150 - (imageSize * 0.7) / 2} 
            y={90 - (imageSize * 0.7) / 2} 
            width={imageSize * 0.7} 
            height={imageSize * 0.7}
            clipPath="url(#triangleClip)"
          />
        );
      default:
        return null;
    }
  };

  const renderClipPaths = () => (
    <defs>
      <clipPath id="circleClip">
        <circle cx="150" cy="100" r="80" />
      </clipPath>
      <clipPath id="triangleClip">
        <polygon points="150,20 240,170 60,170" />
      </clipPath>
    </defs>
  );

  const renderSingleLabel = (x = 0, y = 0, id = "", isInteractive = false) => {
    return (
      <g key={id} transform={`translate(${x}, ${y})`}>
        {renderShape()}
        {renderUserImage()}
        
        <text
          x={textPosition.x}
          y={textPosition.y}
          fontSize={fontSize}
          fontWeight="600"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Inter, system-ui, sans-serif"
          style={{ 
            userSelect: 'none', 
            pointerEvents: isInteractive ? 'auto' : 'none',
            cursor: isInteractive ? 'move' : 'default'
          }}
          onMouseDown={isInteractive ? (e) => handleMouseDown(e, 'main') : undefined}
        >
          {text || 'Tu texto aquí'}
        </text>

        {subText && (
          <text
            x={subTextPosition.x}
            y={subTextPosition.y}
            fontSize={subFontSize}
            fontWeight="400"
            fill={textColor}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter, system-ui, sans-serif"
            style={{ 
              userSelect: 'none', 
              pointerEvents: isInteractive ? 'auto' : 'none',
              cursor: isInteractive ? 'move' : 'default'
            }}
            onMouseDown={isInteractive ? (e) => handleMouseDown(e, 'sub') : undefined}
          >
            {subText}
          </text>
        )}
        
        {isInteractive && isDragging && (
          <>
            <circle
              cx={isDragging === 'main' ? textPosition.x : subTextPosition.x}
              cy={isDragging === 'main' ? textPosition.y : subTextPosition.y}
              r="3"
              fill="#3b82f6"
              opacity="0.7"
            />
            <circle
              cx={isDragging === 'main' ? textPosition.x : subTextPosition.x}
              cy={isDragging === 'main' ? textPosition.y : subTextPosition.y}
              r="15"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              opacity="0.5"
              strokeDasharray="2,2"
            />
          </>
        )}
      </g>
    );
  };

  const renderSheet = () => {
    const labels = [];
    const labelWidth = 300 + spacing;
    const labelHeight = 200 + spacing;
    
    for (let row = 0; row < sheetRows; row++) {
      for (let col = 0; col < sheetCols; col++) {
        const x = col * labelWidth;
        const y = row * labelHeight;
        labels.push(renderSingleLabel(x, y, `${row}-${col}`, false));
      }
    }
    
    return labels;
  };

  const getViewBox = () => {
    switch (shape) {
      case "rectangle":
        return "0 0 300 200";
      case "square":
      case "circle":
      case "triangle":
        return "0 0 300 200";
      default:
        return "0 0 300 200";
    }
  };

  const getSheetViewBox = () => {
    const totalWidth = sheetCols * (300 + spacing) - spacing;
    const totalHeight = sheetRows * (200 + spacing) - spacing;
    return `0 0 ${totalWidth} ${totalHeight}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Generador de Etiquetas
                </h1>
                <p className="text-sm text-gray-500">
                  Crea planchas de etiquetas personalizadas
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('single')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'single' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Vista Individual
              </button>
              <button
                onClick={() => setViewMode('sheet')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'sheet' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Vista Plancha
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center p-4">
                {viewMode === 'single' ? (
                  <div 
                    ref={canvasRef}
                    className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200 max-w-full max-h-full flex items-center justify-center"
                    style={{ minWidth: '400px', minHeight: '320px' }}
                  >
                    <svg
                      viewBox={getViewBox()}
                      className="w-full h-full max-w-[600px] max-h-[480px]"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid meet"
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      style={{ cursor: isDragging ? 'grabbing' : 'default' }}
                    >
                      {renderClipPaths()}
                      {renderSingleLabel(0, 0, "single", true)}
                    </svg>
                  </div>
                ) : (
                  <div 
                    ref={sheetRef}
                    className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200 flex-1 overflow-auto"
                  >
                    <svg
                      viewBox={getSheetViewBox()}
                      className="w-full h-auto min-h-full"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid meet"
                      style={{ maxWidth: '100%' }}
                    >
                      {renderClipPaths()}
                      {renderSheet()}
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-600 flex-shrink-0">
                <p>
                  {viewMode === 'single' 
                    ? 'Vista previa de una etiqueta individual' 
                    : `Plancha de ${sheetRows}x${sheetCols} etiquetas (${sheetRows * sheetCols} total)`
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col">
            <div className="h-[calc(100vh-12rem)] overflow-y-auto space-y-6 pr-2">
              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Diseño de Etiqueta</h2>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Texto principal
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Texto principal de la etiqueta..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Subtexto (opcional)
                  </label>
                  <input
                    type="text"
                    value={subText}
                    onChange={(e) => setSubText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Texto secundario más pequeño..."
                  />
                </div>

                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Posición del texto</h3>
                    <button
                      onClick={resetTextPositions}
                      className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Centrar
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    <p>💡 En la vista individual, puedes arrastrar los textos para posicionarlos donde quieras</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div>Principal: {Math.round(textPosition.x)}, {Math.round(textPosition.y)}</div>
                      {subText && <div>Subtexto: {Math.round(subTextPosition.x)}, {Math.round(subTextPosition.y)}</div>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Imagen personalizada
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/jpeg,image/png"
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      {userImage ? 'Cambiar imagen' : 'Cargar JPG/PNG'}
                    </button>
                    {userImage && (
                      <button
                        onClick={() => setUserImage(null)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        Quitar
                      </button>
                    )}
                  </div>
                  {userImage && (
                    <div className="mt-2">
                      <img 
                        src={userImage} 
                        alt="Preview" 
                        className="w-16 h-16 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                {userImage && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700">Ajustes de imagen</h3>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">
                        Tamaño: {imageSize}px
                      </label>
                      <input
                        type="range"
                        min="80"
                        max="200"
                        value={imageSize}
                        onChange={(e) => setImageSize(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">
                        Opacidad: {Math.round(imageOpacity * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={imageOpacity}
                        onChange={(e) => setImageOpacity(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Forma de la etiqueta
                  </label>
                  <select
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="rectangle">Rectángulo</option>
                    <option value="square">Cuadrado</option>
                    <option value="circle">Círculo</option>
                    <option value="triangle">Triángulo</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Color del texto
                    </label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Color de fondo
                    </label>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tamaño texto principal: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="48"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {subText && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Tamaño subtexto: {subFontSize}px
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="32"
                        value={subFontSize}
                        onChange={(e) => setSubFontSize(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Configuración de Plancha</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Filas: {sheetRows}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={sheetRows}
                      onChange={(e) => setSheetRows(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Columnas: {sheetCols}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      value={sheetCols}
                      onChange={(e) => setSheetCols(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Espaciado: {spacing}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={spacing}
                    onChange={(e) => setSpacing(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <p><strong>Total de etiquetas:</strong> {sheetRows * sheetCols}</p>
                  <p><strong>Tamaño plancha:</strong> {Math.round((sheetCols * (300 + spacing) - spacing) / 10)}cm × {Math.round((sheetRows * (200 + spacing) - spacing) / 10)}cm</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Exportar</h2>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={exportAsImage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Exportar PNG
                  </button>
                  <button
                    onClick={exportAsSVG}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    Exportar SVG
                  </button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  {viewMode === 'single' ? 'Exporta la etiqueta individual' : 'Exporta la plancha completa'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
