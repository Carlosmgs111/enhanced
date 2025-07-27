export type config = {
  pointRadius: number;
  spacing: number;
  backgroundColor: string;
  pointColor: string;
  padding: number;
  character: string;
  makeSelectable: boolean;
  forFont?: boolean;
  unitsPerEm?: number;
  advanceWidth?: number;
  size?: number | string;
};

export function matrixToSVG(
  matrix: number[][],
  config: config = {
    pointRadius: 5,
    spacing: 25,
    backgroundColor: "#f8f9fa",
    pointColor: "#007bff",
    padding: 10,
    character: "",
    makeSelectable: true,
  }
) {
  if (!matrix || !Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("La matriz debe ser un array bidimensional válido");
  }

  const rows = matrix.length;
  const cols = matrix[0].length;

  // Verificar que todas las filas tengan la misma longitud
  if (!matrix.every((row) => Array.isArray(row) && row.length === cols)) {
    throw new Error(
      "Todas las filas de la matriz deben tener la misma longitud"
    );
  }

  // Calcular dimensiones del SVG (SIEMPRE las mismas, sin modificar)
  const gridWidth = (cols - 1) * config.spacing + config.pointRadius * 2;
  const gridHeight = (rows - 1) * config.spacing + config.pointRadius * 2;
  const svgWidth = gridWidth + config.padding * 2;
  const svgHeight = gridHeight + config.padding * 2;

  // Crear elementos SVG (EXACTAMENTE como el código original)
  let svgContent = [];

  // Fondo
  svgContent.push(
    `<rect width="${svgWidth}" height="${svgHeight}" fill="${config.backgroundColor}"/>`
  );

  // Si es seleccionable, añadir texto invisible que represente el carácter
  if (config.makeSelectable && config.character) {
    svgContent.push(`<text x="${svgWidth / 2}" y="${svgHeight / 2}" 
          font-size="1" 
          fill="transparent" 
          text-anchor="middle" 
          dominant-baseline="middle" 
          style="user-select: text; -webkit-user-select: text; -moz-user-select: text; -ms-user-select: text;"
          >${config.character}</text>`);
  }

  // Puntos basados en la matriz (EXACTAMENTE como el código original)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === 1) {
        // Calcular posición del punto
        const x = config.padding + config.pointRadius + col * config.spacing;
        const y = config.padding + config.pointRadius + row * config.spacing;

        svgContent.push(
          `<circle cx="${x}" cy="${y}" r="${config.pointRadius}" fill="${config.pointColor}"/>`
        );
      }
    }
  }

  // SVG base (SIEMPRE igual)
  const baseSvg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        ${svgContent.join("\n    ")}
      </svg>`;

  // Si no hay size, devolver SVG original
  if (config.size === undefined) {
    return baseSvg;
  }

  // Si hay size, envolver en un div con CSS que escale todo
  // Escalar basándose en la dimensión mayor para que todos los glifos tengan tamaño visual similar
  let containerStyle = '';
  if (typeof config.size === 'number') {
    const maxDimension = Math.max(svgWidth, svgHeight);
    const scale = config.size / maxDimension;
    const finalWidth = svgWidth * scale;
    const finalHeight = svgHeight * scale;
    containerStyle = `width: ${finalWidth}px; height: ${finalHeight}px; transform: scale(${scale}); transform-origin: 0 0;`;
  } else {
    const maxDimension = Math.max(svgWidth, svgHeight);
    containerStyle = `width: calc(${config.size} * ${svgWidth / maxDimension}); height: calc(${config.size} * ${svgHeight / maxDimension}); transform: scale(calc(${config.size} / ${maxDimension}px)); transform-origin: 0 0;`;
  }

  return `<div style="display: inline-block; overflow: visible; ${containerStyle}">${baseSvg}</div>`;
}
