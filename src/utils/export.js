import html2canvas from 'html2canvas';

export const exportAsImage = async (elementRef, filename = 'diseño') => {
  if (!elementRef.current) return;

  try {
    const canvas = await html2canvas(elementRef.current, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al exportar imagen:', error);
  }
};

export const exportAsSVG = (svgElement, filename = 'diseño') => {
  try {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.download = `${filename}.svg`;
    link.href = svgUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(svgUrl);
  } catch (error) {
    console.error('Error al exportar SVG:', error);
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    return false;
  }
};
