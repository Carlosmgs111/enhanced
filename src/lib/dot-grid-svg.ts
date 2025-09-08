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
  // Nuevas propiedades para diseño tipográfico
  ascender?: number;
  descender?: number;
  baseline?: number;
  capHeight?: number;
  xHeight?: number;
  leftSideBearing?: number;
  rightSideBearing?: number;
  showGuidelines?: boolean;
  guidelineColor?: string;
  guidelineOpacity?: number;
};

export function matrixToSVG(
  data: number[],
  rows: number,
  cols: number,
  config: config = {
    pointRadius: 5,
    spacing: 25,
    backgroundColor: "#f8f9fa",
    pointColor: "#007bff",
    padding: 10,
    character: "",
    makeSelectable: true,
    forFont: false,
    unitsPerEm: 1000,
    showGuidelines: false,
    guidelineColor: "#ff6b6b",
    guidelineOpacity: 0.3,
  }
) {
  if (!data || !Array.isArray(data)) {
    throw new Error("Los datos deben ser un array válido");
  }

  if (rows <= 0 || cols <= 0) {
    console.log(rows, cols);
    throw new Error("Las filas y columnas deben ser números positivos");
  }

  if (data.length !== rows * cols) {
    throw new Error(
      `El tamaño del array (${data.length}) no coincide con las dimensiones especificadas (${rows}x${cols} = ${rows * cols})`
    );
  }

  // Configuración por defecto para fuentes cuando forFont es true
  // if (config.forFont) {
  //   const defaults = calculateFontDefaults(rows, cols, config);
  //   config = { ...defaults, ...config };
  // }

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

  // Añadir líneas guía tipográficas si está habilitado
  // if (config.forFont && config.showGuidelines) {
  //   svgContent.push(...createTypographicGuidelines(config, svgWidth, svgHeight, rows));
  // }

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

  // Puntos de la matriz
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      
      if (data[index] === 1) {
        const x = config.padding + config.pointRadius + col * config.spacing;
        const y = config.padding + config.pointRadius + row * config.spacing;

        svgContent.push(
          `<circle cx="${x}" cy="${y}" r="${config.pointRadius}" fill="${config.pointColor}"/>`
        );
      }
    }
  }

  // SVG base
  const baseSvg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        ${svgContent.join("\n    ")}
      </svg>`;

  // Si no hay size, devolver SVG original
  if (config.size === undefined) {
    return baseSvg;
  }

  // Si hay size, envolver en un div con CSS que escale todo
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

// // Función para calcular valores por defecto tipográficos
// function calculateFontDefaults(rows: number, cols: number, config: config) {
//   const unitsPerEm = config.unitsPerEm || 1000;
  
//   // Proporciones estándar en tipografía
//   const standardAscender = Math.round(unitsPerEm * 0.8);  // 80% del em
//   const standardDescender = Math.round(unitsPerEm * 0.2); // 20% del em
//   const standardCapHeight = Math.round(unitsPerEm * 0.7); // 70% del em
//   const standardXHeight = Math.round(unitsPerEm * 0.5);   // 50% del em
  
//   // Calcular baseline basado en las filas (aproximadamente 80% desde arriba)
//   const baseline = Math.round(rows * 0.8);
  
//   // Calcular advance width basado en las columnas más sidebearings
//   const leftSideBearing = Math.round(cols * 0.1);  // 10% del ancho
//   const rightSideBearing = Math.round(cols * 0.1); // 10% del ancho
//   const advanceWidth = cols + leftSideBearing + rightSideBearing;

//   return {
//     ...config,
//     ascender: standardAscender,
//     descender: standardDescender,
//     capHeight: standardCapHeight,
//     xHeight: standardXHeight,
//     baseline: baseline,
//     leftSideBearing: leftSideBearing,
//     rightSideBearing: rightSideBearing,
//     advanceWidth: advanceWidth,
//   };
// }

// // Función para crear líneas guía tipográficas
// function createTypographicGuidelines(
//   config: config, 
//   svgWidth: number, 
//   svgHeight: number, 
//   rows: number
// ): string[] {
//   const guidelines = [];
//   const { guidelineColor = "#ff6b6b", guidelineOpacity = 0.3 } = config;
  
//   // Calcular posiciones de las líneas guía
//   const gridTop = config.padding;
//   const gridHeight = (rows - 1) * config.spacing + config.pointRadius * 2;
  
//   // Línea de base (baseline)
//   if (config.baseline !== undefined) {
//     const baselineY = gridTop + config.pointRadius + (config.baseline * config.spacing);
//     guidelines.push(
//       `<line x1="0" y1="${baselineY}" x2="${svgWidth}" y2="${baselineY}" 
//        stroke="${guidelineColor}" stroke-width="2" opacity="${guidelineOpacity}" stroke-dasharray="5,5"/>`
//     );
//     guidelines.push(
//       `<text x="5" y="${baselineY - 5}" font-size="10" fill="${guidelineColor}" opacity="${guidelineOpacity}">baseline</text>`
//     );
//   }
  
//   // Línea de altura x (x-height)
//   if (config.xHeight && config.baseline) {
//     const xHeightRows = Math.round((config.xHeight / config.unitsPerEm!) * rows);
//     const xHeightY = gridTop + config.pointRadius + ((config.baseline - xHeightRows) * config.spacing);
//     guidelines.push(
//       `<line x1="0" y1="${xHeightY}" x2="${svgWidth}" y2="${xHeightY}" 
//        stroke="${guidelineColor}" stroke-width="1" opacity="${guidelineOpacity}" stroke-dasharray="3,3"/>`
//     );
//     guidelines.push(
//       `<text x="5" y="${xHeightY - 5}" font-size="10" fill="${guidelineColor}" opacity="${guidelineOpacity}">x-height</text>`
//     );
//   }
  
//   // Línea de altura de mayúsculas (cap-height)
//   if (config.capHeight && config.baseline) {
//     const capHeightRows = Math.round((config.capHeight / config.unitsPerEm!) * rows);
//     const capHeightY = gridTop + config.pointRadius + ((config.baseline - capHeightRows) * config.spacing);
//     guidelines.push(
//       `<line x1="0" y1="${capHeightY}" x2="${svgWidth}" y2="${capHeightY}" 
//        stroke="${guidelineColor}" stroke-width="1" opacity="${guidelineOpacity}" stroke-dasharray="3,3"/>`
//     );
//     guidelines.push(
//       `<text x="5" y="${capHeightY - 5}" font-size="10" fill="${guidelineColor}" opacity="${guidelineOpacity}">cap-height</text>`
//     );
//   }
  
//   // Línea del ascendente
//   if (config.ascender && config.baseline) {
//     const ascenderRows = Math.round((config.ascender / config.unitsPerEm!) * rows);
//     const ascenderY = gridTop + config.pointRadius + ((config.baseline - ascenderRows) * config.spacing);
//     guidelines.push(
//       `<line x1="0" y1="${ascenderY}" x2="${svgWidth}" y2="${ascenderY}" 
//        stroke="${guidelineColor}" stroke-width="1" opacity="${guidelineOpacity}"/>`
//     );
//     guidelines.push(
//       `<text x="5" y="${ascenderY - 5}" font-size="10" fill="${guidelineColor}" opacity="${guidelineOpacity}">ascender</text>`
//     );
//   }
  
//   // Línea del descendente
//   if (config.descender && config.baseline) {
//     const descenderRows = Math.round((config.descender / config.unitsPerEm!) * rows);
//     const descenderY = gridTop + config.pointRadius + ((config.baseline + descenderRows) * config.spacing);
//     guidelines.push(
//       `<line x1="0" y1="${descenderY}" x2="${svgWidth}" y2="${descenderY}" 
//        stroke="${guidelineColor}" stroke-width="1" opacity="${guidelineOpacity}"/>`
//     );
//     guidelines.push(
//       `<text x="5" y="${descenderY + 15}" font-size="10" fill="${guidelineColor}" opacity="${guidelineOpacity}">descender</text>`
//     );
//   }
  
//   // Líneas laterales para sidebearings
//   if (config.leftSideBearing) {
//     const leftBearingX = config.padding + config.pointRadius + (config.leftSideBearing * config.spacing);
//     guidelines.push(
//       `<line x1="${leftBearingX}" y1="0" x2="${leftBearingX}" y2="${svgHeight}" 
//        stroke="${guidelineColor}" stroke-width="1" opacity="${guidelineOpacity}" stroke-dasharray="2,2"/>`
//     );
//   }
  
//   if (config.rightSideBearing) {
//     const cols = Math.round((svgWidth - 2 * config.padding - 2 * config.pointRadius) / config.spacing) + 1;
//     const rightBearingX = config.padding + config.pointRadius + ((cols - config.rightSideBearing) * config.spacing);
//     guidelines.push(
//       `<line x1="${rightBearingX}" y1="0" x2="${rightBearingX}" y2="${svgHeight}" 
//        stroke="${guidelineColor}" stroke-width="1" opacity="${guidelineOpacity}" stroke-dasharray="2,2"/>`
//     );
//   }
  
//   return guidelines;
// }

// // Función auxiliar mejorada para convertir matriz bidimensional
// export function matrixToFlatArray(matrix: number[][]): { data: number[], rows: number, cols: number } {
//   if (!matrix || !Array.isArray(matrix) || matrix.length === 0) {
//     throw new Error("La matriz debe ser un array bidimensional válido");
//   }

//   const rows = matrix.length;
//   const cols = matrix[0].length;

//   if (!matrix.every((row) => Array.isArray(row) && row.length === cols)) {
//     throw new Error("Todas las filas de la matriz deben tener la misma longitud");
//   }

//   const data = new Array(rows * cols);
  
//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       const index = row * cols + col;
//       data[index] = matrix[row][col] ? 1 : 0;
//     }
//   }

//   return { data, rows, cols };
// }

// // Función para validar métricas de fuente
// export function validateFontMetrics(config: config): { isValid: boolean, errors: string[] } {
//   const errors: string[] = [];
  
//   if (config.forFont) {
//     // Validar unitsPerEm
//     if (config.unitsPerEm && (config.unitsPerEm < 16 || config.unitsPerEm > 16384)) {
//       errors.push("unitsPerEm debe estar entre 16 y 16384");
//     }
    
//     // Validar que ascender + descender no excedan unitsPerEm
//     if (config.ascender && config.descender && config.unitsPerEm) {
//       if (config.ascender + config.descender > config.unitsPerEm) {
//         errors.push("La suma de ascender y descender no puede exceder unitsPerEm");
//       }
//     }
    
//     // Validar que cap-height no exceda ascender
//     if (config.capHeight && config.ascender && config.capHeight > config.ascender) {
//       errors.push("capHeight no puede ser mayor que ascender");
//     }
    
//     // Validar que x-height no exceda cap-height
//     if (config.xHeight && config.capHeight && config.xHeight > config.capHeight) {
//       errors.push("xHeight no puede ser mayor que capHeight");
//     }
    
//     // Validar advance width
//     if (config.advanceWidth && config.advanceWidth <= 0) {
//       errors.push("advanceWidth debe ser un valor positivo");
//     }
//   }
  
//   return {
//     isValid: errors.length === 0,
//     errors
//   };
// }

// // Función para generar configuración tipográfica recomendada
// export function generateRecommendedFontConfig(
//   rows: number, 
//   cols: number, 
//   style: 'serif' | 'sans-serif' | 'monospace' = 'sans-serif'
// ): Partial<config> {
//   const baseConfig = calculateFontDefaults(rows, cols, { unitsPerEm: 1000 });
  
//   // Ajustes específicos por estilo
//   const styleAdjustments = {
//     'serif': {
//       pointRadius: 3,
//       spacing: 20,
//       // Serif fonts typically have more contrast
//       capHeight: Math.round(1000 * 0.68),
//       xHeight: Math.round(1000 * 0.48),
//     },
//     'sans-serif': {
//       pointRadius: 4,
//       spacing: 22,
//       // Sans-serif fonts are more uniform
//       capHeight: Math.round(1000 * 0.7),
//       xHeight: Math.round(1000 * 0.52),
//     },
//     'monospace': {
//       pointRadius: 3,
//       spacing: 25,
//       // Monospace fonts have fixed width
//       advanceWidth: cols * 1.2, // Wider for monospace
//       capHeight: Math.round(1000 * 0.65),
//       xHeight: Math.round(1000 * 0.45),
//     }
//   };
  
//   return {
//     ...baseConfig,
//     ...styleAdjustments[style],
//     forFont: true,
//     showGuidelines: true,
//     guidelineColor: "#ff6b6b",
//     guidelineOpacity: 0.2,
//   };
// }