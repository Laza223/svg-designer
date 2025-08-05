# 🎨 SVG Designer Studio

Una aplicación web moderna para crear diseños vectoriales personalizados con una interfaz intuitiva y herramientas profesionales.

![SVG Designer Studio](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC)

## ✨ Características

- **🎯 Diseño Intuitivo**: Interfaz limpia y moderna con controles fáciles de usar
- **🔷 Múltiples Formas**: Rectángulos, círculos, triángulos, hexágonos, estrellas y más
- **🎨 Personalización Completa**: Control total sobre colores, tipografía y estilos
- **📏 Bordes Personalizables**: Añade y personaliza bordes con diferentes grosores y colores
- **💾 Exportación Múltiple**: Exporta tus diseños en formato PNG y SVG
- **📱 Diseño Responsive**: Funciona perfectamente en desktop, tablet y móvil
- **⚡ Vista Previa en Tiempo Real**: Ve los cambios instantáneamente mientras diseñas

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Laza223/svg-designer.git
cd svg-designer
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **html2canvas** - Exportación de imágenes
- **Inter Font** - Tipografía moderna

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la build de producción
```

## 🎯 Casos de Uso

- **Diseño de Logos**: Crea logos simples y efectivos
- **Gráficos para Redes Sociales**: Diseña elementos visuales para posts
- **Prototipos Rápidos**: Bocetos y conceptos visuales
- **Material Educativo**: Diagramas y elementos gráficos
- **Branding Personal**: Elementos de identidad visual

## 🔧 Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── Header.jsx      # Encabezado de la aplicación
│   ├── SVGCanvas.jsx   # Lienzo principal de diseño
│   └── ControlPanel.jsx # Panel de controles
├── hooks/              # Hooks personalizados
│   └── useDesignState.js # Manejo del estado del diseño
├── utils/              # Utilidades y helpers
│   ├── shapes.js       # Definiciones de formas SVG
│   └── export.js       # Funciones de exportación
├── App.jsx            # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🎨 Funcionalidades Detalladas

### Formas Disponibles

- ⬜ Rectángulo con bordes redondeados
- ⭐ Cuadrado con esquinas suaves
- ⭕ Círculo perfecto
- 🔺 Triángulo equilátero
- ⬡ Hexágono regular
- ⭐ Estrella de cinco puntas

### Controles de Texto

- ✏️ Contenido personalizable
- 🎨 Color configurable
- 📝 Múltiples pesos de fuente
- 📏 Tamaño ajustable (12px - 48px)

### Opciones de Estilo

- 🎯 Color de fondo personalizable
- 🖼️ Bordes opcionales con grosor variable
- 🎨 Color de borde personalizable
- ✨ Efectos de sombra integrados

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Laza223**

- GitHub: [@Laza223](https://github.com/Laza223)

## 🙏 Agradecimientos

- [React](https://reactjs.org/) por la excelente biblioteca
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [Vite](https://vitejs.dev/) por la herramienta de desarrollo
- [Lucide React](https://lucide.dev/) por los iconos (si se usan)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
