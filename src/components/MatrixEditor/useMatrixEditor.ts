import { useState, useCallback, useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import { matrix } from "../../stores/matrixState";
import { matrixIsLocked as matrixIsLockedStore } from "../../stores/matrixState";
import { dragMode } from "../../stores/matrixState";
import {
  updateDimensions,
  updateDimensionsWithCentering,
  updateDimensionsSmooth,
} from "./updateDimension";

const CELL_SIZE = 15;
const ACTIVE_COLOR = "#4CAF50";
const INACTIVE_COLOR = "#f0f0f0";

export const useMatrixEditor = () => {
  const isMouseDown = useRef(false);
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(30);
  const totalCells = rows * cols;
  const grid = useRef(new Uint8Array(totalCells));
  const cells = useRef<HTMLDivElement[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
  useStore(matrix);
  useStore(matrixIsLockedStore);
  useStore(dragMode);
  const initializeGrid = () => {
    const element = gridRef.current;
    if (!element) return;

    element.style.gridTemplateColumns = `repeat(${cols}, ${CELL_SIZE}px)`;
    const fragment = document.createDocumentFragment();
    cells.current = new Array(totalCells);
    grid.current = new Uint8Array(totalCells);

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.backgroundColor = INACTIVE_COLOR;
      cell.style.width = `${CELL_SIZE}px`;
      cell.style.height = `${CELL_SIZE}px`;
      cell.style.cursor = "pointer";
      cell.style.border = "1px dotted #ccc";
      cell.onclick = () => {
        console.log({ dragMode });
        const dragModes = {
          toggle: () => toggleByIndex(i),
          activate: () => activateByIndex(i),
          deactivate: () => deactivateByIndex(i),
        };
        dragModes[dragMode.get()]();
      };
      cell.onmouseenter = () => {
        if (!isMouseDown.current) return;
        const dragModes = {
          toggle: () => toggleByIndex(i),
          activate: () => activateByIndex(i),
          deactivate: () => deactivateByIndex(i),
        };
        dragModes[dragMode.get()]();
      };
      matrixIsLockedStore.subscribe((value) => {
        if (value) {
          cell.style.cursor = "not-allowed";
          cell.style.border = "1px solid #ccc";
          cell.style.pointerEvents = "none";
        } else {
          cell.style.cursor = "pointer";
          cell.style.border = "1px dotted #ccc";
          cell.style.pointerEvents = "auto";
        }
      });
      fragment.appendChild(cell);
      cells.current[i] = cell;
    }

    element.innerHTML = "";
    element.appendChild(fragment);
  };

  const toggleByIndex = (index: number) => {
    console.log("toggleByIndex", index);
    const newValue = grid.current[index] ^ 1;
    grid.current[index] = newValue;
    cells.current[index].style.backgroundColor = newValue
      ? ACTIVE_COLOR
      : INACTIVE_COLOR;
    syncGridToMatrix();
  };
  const activateByIndex = (index: number) => {
    console.log("activateByIndex", index);
    if (grid.current[index] === 0) {
      grid.current[index] = 1;
      cells.current[index].style.backgroundColor = ACTIVE_COLOR;
    }
    syncGridToMatrix();
  };
  const deactivateByIndex = (index: number) => {
    console.log("deactivateByIndex", index, grid.current[index]);
    if (grid.current[index] === 1) {
      grid.current[index] = 0;
      cells.current[index].style.backgroundColor = INACTIVE_COLOR;
    }
    syncGridToMatrix();
  };
  const fillPattern = () => {
    // Validar que el patrón tenga las dimensiones correctas
    if (!matrix.get() || matrix.get().length !== rows) {
      console.error("El patrón debe tener la altura correcta");
      return;
    }

    for (let y = 0; y < rows; y++) {
      if (!matrix.get()[y] || matrix.get()[y].length !== cols) {
        console.error(`La fila ${y} debe tener el ancho correcto`);
        return;
      }

      for (let x = 0; x < cols; x++) {
        const i = y * cols + x; // Convertir coordenadas 2D a índice 1D
        const value = matrix.get()[y][x] ? 1 : 0; // Asegurar que sea 0 o 1

        grid.current[i] = value;
        cells.current[i].style.backgroundColor = value
          ? ACTIVE_COLOR
          : INACTIVE_COLOR;
      }
    }
  };

  // ? update matrix dimensions
  // Agregar refs para mantener las dimensiones previas
  const prevRows = useRef(rows);
  const prevCols = useRef(cols);

  // Función auxiliar para sincronizar grid con matrix (nanostores)
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
  }, [rows, cols, grid.current]);

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
  }, [rows, cols]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    initializeGrid();
    fillPattern();
  }, []);

  const getGridHandling = () => {
    return {
      grid: gridRef.current,
      totalCells,
      cells: cells.current,
      cols,
      rows,
      setRows,
      setCols,
      matrix,
      gridRef,
      dragMode: dragMode.get(),
      setDragMode: dragMode.set,
      matrixIsLocked: matrixIsLockedStore.get(),
      setMatrixIsLocked: matrixIsLockedStore.set,
      getGridHandling,
    };
  };

  return {
    getGridHandling,
  };
};
