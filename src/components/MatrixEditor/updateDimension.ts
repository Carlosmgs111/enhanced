import { useCallback } from "react";

export const updateDimensions = ({ rows, cols, grid, prevRows, prevCols, initializeGrid }: any) => {
    const newTotalCells = rows * cols;
    const currentGrid = grid.current;
    const currentTotalCells = currentGrid.length;

    // Si es la primera inicialización, no hay datos que preservar
    if (currentTotalCells === 0) {
      grid.current = new Uint8Array(newTotalCells);
      prevRows.current = rows;
      prevCols.current = cols;
      initializeGrid();
      return;
    }

    // Usar las dimensiones anteriores (antes del cambio)
    const oldRows = prevRows.current;
    const oldCols = prevCols.current;

    // Si las dimensiones no cambiaron, no hacer nada
    if (oldRows === rows && oldCols === cols) {
      return;
    }

    const newGrid = new Uint8Array(newTotalCells);
    const getIndex = (row: number, col: number, totalCols: number) =>
      row * totalCols + col;

    // Estrategia de preservación de datos más inteligente
    if (rows >= oldRows && cols >= oldCols) {
      // CASO 1: Expandiendo en ambas direcciones o manteniendo - copiar todo
      for (let row = 0; row < oldRows; row++) {
        for (let col = 0; col < oldCols; col++) {
          const oldIndex = getIndex(row, col, oldCols);
          const newIndex = getIndex(row, col, cols);
          newGrid[newIndex] = currentGrid[oldIndex];
        }
      }
    } else if (rows <= oldRows && cols <= oldCols) {
      // CASO 2: Reduciendo en ambas direcciones - tomar esquina superior izquierda
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const oldIndex = getIndex(row, col, oldCols);
          const newIndex = getIndex(row, col, cols);
          if (oldIndex < currentGrid.length) {
            newGrid[newIndex] = currentGrid[oldIndex];
          }
        }
      }
    } else if (rows > oldRows && cols < oldCols) {
      // CASO 3: Más filas, menos columnas - conservar parte superior y truncar columnas
      for (let row = 0; row < oldRows; row++) {
        for (let col = 0; col < cols; col++) {
          const oldIndex = getIndex(row, col, oldCols);
          const newIndex = getIndex(row, col, cols);
          if (oldIndex < currentGrid.length) {
            newGrid[newIndex] = currentGrid[oldIndex];
          }
        }
      }
    } else if (rows < oldRows && cols > oldCols) {
      // CASO 4: Menos filas, más columnas - conservar parte izquierda y truncar filas
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < oldCols; col++) {
          const oldIndex = getIndex(row, col, oldCols);
          const newIndex = getIndex(row, col, cols);
          if (oldIndex < currentGrid.length) {
            newGrid[newIndex] = currentGrid[oldIndex];
          }
        }
      }
    }

    // Actualizar el grid y las dimensiones previas
    grid.current = newGrid;
    prevRows.current = rows;
    prevCols.current = cols;

    // Reinicializar el DOM
    initializeGrid();
  };

  // Versión alternativa con centrado (más sofisticada)
  export const updateDimensionsWithCentering = ({ rows, cols, grid, prevRows, prevCols, initializeGrid }: any) => {
    const newTotalCells = rows * cols;
    const currentGrid = grid.current;
    const currentTotalCells = currentGrid.length;

    if (currentTotalCells === 0) {
      grid.current = new Uint8Array(newTotalCells);
      prevRows.current = rows;
      prevCols.current = cols;
      initializeGrid();
      return;
    }

    const oldRows = prevRows.current;
    const oldCols = prevCols.current;

    if (oldRows === rows && oldCols === cols) {
      return;
    }

    const newGrid = new Uint8Array(newTotalCells);
    const getIndex = (row: number, col: number, totalCols: number) =>
      row * totalCols + col;

    // Calcular offsets para centrar el contenido existente
    const rowOffset = Math.max(0, Math.floor((rows - oldRows) / 2));
    const colOffset = Math.max(0, Math.floor((cols - oldCols) / 2));

    // Calcular límites de copia
    const copyRows = Math.min(oldRows, rows - rowOffset);
    const copyCols = Math.min(oldCols, cols - colOffset);

    // Copiar datos centrados
    for (let row = 0; row < copyRows; row++) {
      for (let col = 0; col < copyCols; col++) {
        const oldIndex = getIndex(row, col, oldCols);
        const newRow = row + rowOffset;
        const newCol = col + colOffset;

        if (newRow < rows && newCol < cols && oldIndex < currentGrid.length) {
          const newIndex = getIndex(newRow, newCol, cols);
          newGrid[newIndex] = currentGrid[oldIndex];
        }
      }
    }

    grid.current = newGrid;
    prevRows.current = rows;
    prevCols.current = cols;

    initializeGrid();
  };

  // Versión con preservación inteligente y transición suave
  export const updateDimensionsSmooth = ({ rows, cols, grid, prevRows, prevCols, initializeGrid, syncGridToMatrix }: any) => {
    const newTotalCells = rows * cols;
    const currentGrid = grid.current;
    const currentTotalCells = currentGrid.length;

    if (currentTotalCells === 0) {
      grid.current = new Uint8Array(newTotalCells);
      prevRows.current = rows;
      prevCols.current = cols;
      initializeGrid();
      return;
    }

    const oldRows = prevRows.current;
    const oldCols = prevCols.current;

    if (oldRows === rows && oldCols === cols) return;

    const newGrid = new Uint8Array(newTotalCells);
    const getIndex = (row: number, col: number, totalCols: number) =>
      row * totalCols + col;

    // Determinar estrategia basada en el cambio
    const rowDiff = rows - oldRows;
    const colDiff = cols - oldCols;

    let startRow = 0;
    let startCol = 0;

    // Si se están agregando filas/columnas, decidir dónde colocar el contenido existente
    if (rowDiff > 0) {
      // Agregar filas nuevas al final (comportamiento natural)
      startRow = 0;
    } else if (rowDiff < 0) {
      // Eliminar filas desde arriba (mantener contenido inferior)
      startRow = 0;
    }

    if (colDiff > 0) {
      // Agregar columnas al final
      startCol = 0;
    } else if (colDiff < 0) {
      // Eliminar columnas desde la derecha
      startCol = 0;
    }

    // Copiar datos preservando tanto como sea posible
    const maxCopyRows = Math.min(oldRows, rows);
    const maxCopyCols = Math.min(oldCols, cols);

    for (let row = 0; row < maxCopyRows; row++) {
      for (let col = 0; col < maxCopyCols; col++) {
        const oldIndex = getIndex(row, col, oldCols);
        const newIndex = getIndex(row + startRow, col + startCol, cols);

        if (oldIndex < currentGrid.length && newIndex < newGrid.length) {
          newGrid[newIndex] = currentGrid[oldIndex];
        }
      }
    }

    // Actualizar referencias
    grid.current = newGrid;
    prevRows.current = rows;
    prevCols.current = cols;

    // Sincronizar con nanostores si es necesario
    syncGridToMatrix();

    
    initializeGrid();
  };