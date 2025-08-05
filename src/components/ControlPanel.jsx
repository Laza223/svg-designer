import React from 'react';
import { SHAPES } from '../utils/shapes.jsx';

const ControlPanel = ({ design, updateDesign, onExportPNG, onExportSVG, onReset }) => {
  const handleTextChange = (e) => {
    updateDesign({ text: e.target.value });
  };

  const handleShapeChange = (e) => {
    updateDesign({ shape: e.target.value });
  };

  const handleColorChange = (field) => (e) => {
    updateDesign({ [field]: e.target.value });
  };

  const handleNumberChange = (field) => (e) => {
    updateDesign({ [field]: parseInt(e.target.value) });
  };

  const handleStrokeToggle = () => {
    updateDesign({ showStroke: !design.showStroke });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Panel de Control</h2>
        <button
          onClick={onReset}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Reiniciar
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Texto
        </label>
        <input
          type="text"
          value={design.text}
          onChange={handleTextChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Escribe tu texto..."
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Forma
        </label>
        <select
          value={design.shape}
          onChange={handleShapeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          {Object.entries(SHAPES).map(([key, shape]) => (
            <option key={key} value={key}>
              {shape.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Color del texto
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={design.textColor}
              onChange={handleColorChange('textColor')}
              className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={design.textColor}
              onChange={handleColorChange('textColor')}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Color de fondo
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={design.backgroundColor}
              onChange={handleColorChange('backgroundColor')}
              className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={design.backgroundColor}
              onChange={handleColorChange('backgroundColor')}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tamaño de fuente
          </label>
          <input
            type="range"
            min="12"
            max="48"
            value={design.fontSize}
            onChange={handleNumberChange('fontSize')}
            className="w-full"
          />
          <span className="text-sm text-gray-500">{design.fontSize}px</span>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Peso de fuente
          </label>
          <select
            value={design.fontWeight}
            onChange={(e) => updateDesign({ fontWeight: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="500">Medio</option>
            <option value="600">Semi-negrita</option>
            <option value="700">Negrita</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showStroke"
            checked={design.showStroke}
            onChange={handleStrokeToggle}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="showStroke" className="text-sm font-medium text-gray-700">
            Mostrar borde
          </label>
        </div>

        {design.showStroke && (
          <div className="grid grid-cols-2 gap-4 pl-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Color del borde
              </label>
              <input
                type="color"
                value={design.strokeColor}
                onChange={handleColorChange('strokeColor')}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Grosor del borde
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={design.strokeWidth}
                onChange={handleNumberChange('strokeWidth')}
                className="w-full"
              />
              <span className="text-sm text-gray-500">{design.strokeWidth}px</span>
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Exportar diseño</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onExportPNG}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Exportar PNG
          </button>
          <button
            onClick={onExportSVG}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Exportar SVG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
