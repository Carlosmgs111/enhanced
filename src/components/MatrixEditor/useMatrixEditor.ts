import { useState, useCallback, useEffect, useRef, useReducer, useMemo } from "react";
import { useStore } from "@nanostores/react";
import { matrix } from "../../stores/matrixState";
import { matrixIsLocked as matrixIsLockedStore } from "../../stores/matrixState";
import { dragMode } from "../../stores/matrixState";
import { updateDimensionsSmooth } from "./updateDimension";

const CELL_SIZE = 15;
const ACTIVE_COLOR = "#4CAF50";
const INACTIVE_COLOR = "#f0f0f0";

export const useMatrixEditor = () => {
  const [panels, dispatchPanels] = useReducer(
    (preState: any, state: any) => {
      return { ...preState, ...state };
    },
    {
      middleLeft: null,
      middleRight: null,
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null,
    }
  );
  
  const isMouseDown = useRef(false);
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const totalCells = rows * cols;
  const grid = useRef(new Uint8Array(totalCells));
  const cells = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prevRows = useRef(rows);
  const prevCols = useRef(cols);
  
  // Stores
  const matrixValue = useStore(matrix);
  const isLocked = useStore(matrixIsLockedStore);
  const currentDragMode = useStore(dragMode);

  // Método unificado para aplicar el estilo visual de una celda
  const applyCellStyle = useCallback((index: number, isActive: boolean) => {
    const cell = cells.current[index];
    if (!cell) return;

    if (isActive) {
      cell.classList.add("bg-gray-700", "border-white");
      cell.classList.remove("border-gray-300");
    } else {
      cell.classList.remove("bg-gray-700", "border-white");
      cell.classList.add("border-gray-300");
    }
  }, []);

  // Método unificado para actualizar una celda (estado + visual)
  const updateCell = useCallback((index: number, value: 0 | 1) => {
    grid.current[index] = value;
    applyCellStyle(index, value === 1);
  }, [applyCellStyle]);

  // Sincronizar grid interno con matrix store
  const syncGridToMatrix = useCallback(() => {
    const newMatrix: number[][] = [];
    for (let row = 0; row < rows; row++) {
      newMatrix[row] = [];
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        newMatrix[row][col] = grid.current[index] || 0;
      }
    }
    matrix.set(newMatrix);
  }, [rows, cols]);

  // Sincronizar matrix store con grid interno y visual
  const syncMatrixToGrid = useCallback(() => {
    if (!matrixValue || matrixValue.length !== rows) {
      console.warn("Matrix dimensions don't match current grid dimensions");
      return;
    }

    for (let row = 0; row < rows; row++) {
      if (!matrixValue[row] || matrixValue[row].length !== cols) {
        console.warn(`Row ${row} doesn't match expected column count`);
        continue;
      }

      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const value = matrixValue[row][col] ? 1 : 0;
        updateCell(index, value as 0 | 1);
      }
    }
  }, [matrixValue, rows, cols, updateCell]);

  const toggleByIndex = useCallback((index: number) => {
    const newValue = (grid.current[index] ^ 1) as 0 | 1;
    updateCell(index, newValue);
    syncGridToMatrix();
  }, [updateCell, syncGridToMatrix]);

  const activateByIndex = useCallback((index: number) => {
    if (grid.current[index] === 0) {
      updateCell(index, 1);
      syncGridToMatrix();
    }
  }, [updateCell, syncGridToMatrix]);

  const deactivateByIndex = useCallback((index: number) => {
    if (grid.current[index] === 1) {
      updateCell(index, 0);
      syncGridToMatrix();
    }
  }, [updateCell, syncGridToMatrix]);

  const createCellEventHandlers = useCallback((index: number) => {
    const handleClick = () => {
      if (isLocked) return;
      
      const dragModes = {
        toggle: () => toggleByIndex(index),
        activate: () => activateByIndex(index),
        deactivate: () => deactivateByIndex(index),
      };
      dragModes[currentDragMode]?.();
    };

    const handleMouseEnter = () => {
      if (!isMouseDown.current || isLocked) return;
      
      const dragModes = {
        toggle: () => toggleByIndex(index),
        activate: () => activateByIndex(index),
        deactivate: () => deactivateByIndex(index),
      };
      dragModes[currentDragMode]?.();
    };

    return { handleClick, handleMouseEnter };
  }, [isLocked, currentDragMode, toggleByIndex, activateByIndex, deactivateByIndex]);

  const applyCellLockState = useCallback((cell: HTMLDivElement) => {
    if (isLocked) {
      cell.style.cursor = "not-allowed";
      cell.style.pointerEvents = "none";
    } else {
      cell.style.cursor = "pointer";
      cell.style.pointerEvents = "auto";
    }
  }, [isLocked]);

  const initializeGrid = useCallback(() => {
    const element = gridRef.current;
    if (!element) return;

    element.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const fragment = document.createDocumentFragment();
    
    // Reinicializar arrays
    cells.current = new Array(totalCells);
    grid.current = new Uint8Array(totalCells);

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "w-6 aspect-square border-[1px] border-dotted border-gray-300 text-sm font-bold";
      
      const { handleClick, handleMouseEnter } = createCellEventHandlers(i);
      cell.onclick = handleClick;
      cell.onmouseenter = handleMouseEnter;
      
      // Aplicar estado de bloqueo inicial
      applyCellLockState(cell);
      
      // Aplicar estilo inicial (inactivo)
      applyCellStyle(i, false);
      
      fragment.appendChild(cell);
      cells.current[i] = cell;
    }

    element.innerHTML = "";
    element.appendChild(fragment);
  }, [cols, totalCells, createCellEventHandlers, applyCellLockState, applyCellStyle]);

  // Actualizar estado de bloqueo en todas las celdas cuando cambie isLocked
  useEffect(() => {
    cells.current.forEach(cell => {
      if (cell) applyCellLockState(cell);
    });
  }, [isLocked, applyCellLockState]);

  // Effect para manejar cambios de dimensiones
  useEffect(() => {
    updateDimensionsSmooth({
      rows,
      cols,
      grid,
      prevRows,
      prevCols,
      initializeGrid,
      syncGridToMatrix,
    });
    
    syncMatrixToGrid();
    
  }, [rows, cols, initializeGrid, syncGridToMatrix, syncMatrixToGrid]);

  // Effect para sincronizar cuando cambie el matrix store externamente
  useEffect(() => {
    if (matrixValue && cells.current.length > 0) {
      syncMatrixToGrid();
    }
  }, [matrixValue, syncMatrixToGrid]);

  // Effect de inicialización
  useEffect(() => {
    initializeGrid();
    
    const handleMouseDown = () => {
      isMouseDown.current = true;
    };
    const handleMouseUp = () => {
      isMouseDown.current = false;
    };
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [initializeGrid]);

  const gridHandling = useMemo(() => ({
    panels,
    grid: grid.current,
    totalCells,
    cells: cells.current,
    cols,
    rows,
    setRows,
    setCols,
    matrix,
    gridRef,
    // dragMode: currentDragMode,
    // setDragMode: dragMode.set,
    matrixIsLocked: isLocked,
    setMatrixIsLocked: matrixIsLockedStore.set,
    syncGridToMatrix,
    syncMatrixToGrid,
  }), [
    panels,
    cols,
    rows,
    totalCells,
    currentDragMode,
    isLocked,
    syncGridToMatrix,
    syncMatrixToGrid,
  ]);

  return {
    gridHandling,
    setPanels: dispatchPanels,
  };
};