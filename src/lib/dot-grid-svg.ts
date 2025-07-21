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

  // Calcular dimensiones del SVG
  const gridWidth = (cols - 1) * config.spacing + config.pointRadius * 2;
  const gridHeight = (rows - 1) * config.spacing + config.pointRadius * 2;
  const svgWidth = gridWidth + config.padding * 2;
  const svgHeight = gridHeight + config.padding * 2;

  // Crear elementos SVG
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

  // Puntos basados en la matriz
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

  // Construir el SVG completo
  const svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        ${svgContent.join("\n    ")}
      </svg>`;

  return svg;
}

// ? enhanced version
export function matrixToFontSVG(
    matrix: number[][],
    config: config
  ): string {
    // Si no es para fuente, usar la función original
    if (!config.forFont) {
      return matrixToSVG(matrix, config);
    }
  
    // Configuración específica para fuentes
    const fontConfig = {
      unitsPerEm: config.unitsPerEm || 1000,
      advanceWidth: config.advanceWidth || 600,
      ...config
    };
  
    if (!matrix || !Array.isArray(matrix) || matrix.length === 0) {
      throw new Error("La matriz debe ser un array bidimensional válido");
    }
  
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    if (!matrix.every((row) => Array.isArray(row) && row.length === cols)) {
      throw new Error("Todas las filas de la matriz deben tener la misma longitud");
    }
  
    // Calcular dimensiones del grid original
    const gridWidth = (cols - 1) * config.spacing + config.pointRadius * 2;
    const gridHeight = (rows - 1) * config.spacing + config.pointRadius * 2;
    const totalWidth = gridWidth + config.padding * 2;
    const totalHeight = gridHeight + config.padding * 2;
  
    // Escalar al sistema de coordenadas de fuente
    const scaleX = fontConfig.advanceWidth / totalWidth;
    const scaleY = fontConfig.unitsPerEm / totalHeight;
  
    let svgContent = [];
  
    // Para fuentes: solo los puntos, sin fondo
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (matrix[row][col] === 1) {
          // Posición original
          const origX = config.padding + config.pointRadius + col * config.spacing;
          const origY = config.padding + config.pointRadius + row * config.spacing;
  
          // Escalar y invertir Y para fuentes (origen abajo-izquierda)
          const x = origX * scaleX;
          const y = fontConfig.unitsPerEm - (origY * scaleY);
  
          svgContent.push(
            `<circle cx="${x}" cy="${y}" r="${config.pointRadius * Math.min(scaleX, scaleY)}" fill="${config.pointColor}"/>`
          );
        }
      }
    }
  
    // SVG con viewBox para fuentes
    const svg = `<svg width="${fontConfig.advanceWidth}" height="${fontConfig.unitsPerEm}" viewBox="0 0 ${fontConfig.advanceWidth} ${fontConfig.unitsPerEm}" xmlns="http://www.w3.org/2000/svg">
      ${svgContent.join('\n    ')}
    </svg>`;
  
    return svg;
  }
