import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useReducer,
  useMemo,
} from "react";
import { useStore } from "@nanostores/react";
import { matrix } from "../../stores/matrixState";
import { matrixIsLocked as matrixIsLockedStore } from "../../stores/matrixState";
import { dragMode } from "../../stores/matrixState";
import { updateDimensionsSmooth } from "./updateDimension";

export const useMatrixEditor = () => {
  const [panels, dispatchPanels] = useReducer(
    (preState: any, state: any) => ({ ...preState, ...state }),
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
  const [rows, setRows] = useState(matrix.get().rows);
  const [cols, setCols] = useState(matrix.get().cols);
  const grid = useRef(new Uint8Array(rows * cols));
  const cells = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prevRows = useRef(rows);
  const prevCols = useRef(cols);
  const isInitialized = useRef(false); // Flag para controlar inicialización

  const matrixValue = useStore(matrix);
  const isLocked = useStore(matrixIsLockedStore);
  const currentDragMode = useStore(dragMode);

  const updateCell = useCallback((index: number, value: 0 | 1) => {
    grid.current[index] = value;
    const cell = cells.current[index];
    if (!cell) return;
    if (value) {
      cell.classList.add("bg-gray-700", "border-white");
      cell.classList.remove("border-gray-300");
    } else {
      cell.classList.remove("bg-gray-700", "border-white");
      cell.classList.add("border-gray-300");
    }
    matrix.set({ matrix: Array.from(grid.current), cols, rows });
  }, [rows, cols]);

  const handleCellAction = useCallback(
    (index: number, action: "toggle" | "activate" | "deactivate") => {
      if (isLocked) return;
      const current = grid.current[index];
      let newValue: 0 | 1;
      const cellAction = {
        toggle: (): 0 | 1 => (current ^ 1) as 0 | 1,
        activate: (): 0 | 1 => 1,
        deactivate: (): 0 | 1 => 0,
      };
      newValue = cellAction[action]();
      if (current !== newValue) {
        updateCell(index, newValue);
        matrix.set({ matrix: Array.from(grid.current), cols, rows });
      }
    },
    [isLocked, updateCell, cols, rows]
  );

  // Función para recrear SOLO los elementos DOM manteniendo el estado
  const recreateGridDOM = useCallback(() => {
    const element = gridRef.current;
    if (!element) return;

    element.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const fragment = document.createDocumentFragment();
    const totalCells = rows * cols;

    cells.current = new Array(totalCells);

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      
      // Aplicar el estado visual basado en grid.current[i]
      const isActive = grid.current && grid.current[i] === 1;
      const baseClasses = "w-6 aspect-square border-[1px] border-dotted text-sm font-bold";
      const activeClasses = isActive ? "bg-gray-700 border-white" : "border-gray-300";
      cell.className = `${baseClasses} ${activeClasses}`;
      
      cell.onclick = () => handleCellAction(i, currentDragMode);
      cell.onmouseenter = () => {
        if (isMouseDown.current) handleCellAction(i, currentDragMode);
      };
      
      fragment.appendChild(cell);
      cells.current[i] = cell;
    }
    
    element.innerHTML = "";
    element.appendChild(fragment);
  }, [cols, rows, currentDragMode, handleCellAction]);

  // Función para inicialización completa (SOLO primera vez)
  const initializeGrid = useCallback(() => {
    const totalCells = rows * cols;
    grid.current = new Uint8Array(totalCells);
    recreateGridDOM();
    isInitialized.current = true;
  }, [rows, cols, recreateGridDOM]);

  // Actualizar estilos de bloqueo
  useEffect(() => {
    cells.current.forEach((cell) => {
      if (cell) {
        cell.style.cursor = isLocked ? "not-allowed" : "pointer";
        cell.style.pointerEvents = isLocked ? "none" : "auto";
      }
    });
  }, [isLocked]);

  // Panel setters
  const setPanels = useMemo(
    () => ({
      setMiddleLeft: (panel: React.ReactNode) =>
        dispatchPanels({ middleLeft: panel }),
      setTopLeft: (panel: React.ReactNode) =>
        dispatchPanels({ topLeft: panel }),
      setTopMiddle: (panel: React.ReactNode) =>
        dispatchPanels({ topMiddle: panel }),
      setTopRight: (panel: React.ReactNode) =>
        dispatchPanels({ topRight: panel }),
      setBottomLeft: (panel: React.ReactNode) =>
        dispatchPanels({ bottomLeft: panel }),
      setBottomMiddle: (panel: React.ReactNode) =>
        dispatchPanels({ bottomMiddle: panel }),
      setBottomRight: (panel: React.ReactNode) =>
        dispatchPanels({ bottomRight: panel }),
    }),
    []
  );

  // Cambios de dimensiones - SOLO si ya está inicializado
  useEffect(() => {
    if (!isInitialized.current) return;

    updateDimensionsSmooth({
      rows,
      cols,
      grid,
      prevRows,
      prevCols,
      recreateGridDOM, // Usar recreateGridDOM en lugar de initializeGrid
    });
    
    matrix.set({
      cols: cols,
      rows: rows,
      matrix: Array.from(grid.current),
    });
  }, [rows, cols, recreateGridDOM]);

  // Inicialización inicial - SOLO una vez
  useEffect(() => {
    if (isInitialized.current) return;

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
  }, []); // Array vacío para que solo se ejecute una vez

  return {
    gridHandling: useMemo(
      () => ({
        panels,
        ...setPanels,
        updateCell,
        grid: grid.current,
        totalCells: rows * cols,
        cells: cells.current,
        cols,
        rows,
        setRows,
        setCols,
        matrix,
        gridRef,
        dragMode: currentDragMode,
        setDragMode: dragMode.set,
        matrixIsLocked: isLocked,
        setMatrixIsLocked: matrixIsLockedStore.set,
        // syncGridToMatrix,
        // syncMatrixToGrid,
      }),
      [
        panels,
        setPanels,
        rows,
        cols,
        currentDragMode,
        isLocked,
        // syncGridToMatrix,
        // syncMatrixToGrid,
      ]
    ),
    setPanels: dispatchPanels,
  };
};