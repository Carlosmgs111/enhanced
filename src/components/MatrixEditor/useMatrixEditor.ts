import { useState, useCallback, useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import { matrix } from "../../stores/matrixState";

export const useMatrixEditor = () => {
  const [rows, setRows] = useState(17);
  const [cols, setCols] = useState(11);
  const [isDragging, setIsDragging] = useState(false);
  const [matrixIsLocked, setMatrixIsLocked] = useState(false);
  const matrixRef = useRef(null);
  const [dragMode, setDragMode] = useState<
    "toggle" | "activate" | "deactivate"
  >("toggle");
  // ? ⬇️ important for it works
  useStore(matrix);
  // ? create matrix with specific dimensions
  const createMatrix = useCallback((r: number, c: number, fill = 0) => {
    return Array(r)
      .fill(null)
      .map(() => Array(c).fill(fill));
  }, []);

  // ? update matrix dimensions
  const updateDimensions = useCallback(() => {
    const newMatrix: number[][] = createMatrix(rows, cols, 0);
    const currentMatrix = matrix.get();
    const currentRows = currentMatrix.length;
    const currentCols = currentMatrix[0]?.length || 0;
    const rowDifference = rows - currentRows;
    if (rowDifference >= 0) {
      const rowOffset = rowDifference;
      for (let i = 0; i < currentRows; i++) {
        for (let j = 0; j < Math.min(cols, currentCols); j++) {
          if (currentMatrix[i] && currentMatrix[i][j] !== undefined) {
            const newRowIndex = i + rowOffset;
            if (newRowIndex < rows) {
              newMatrix[newRowIndex][j] = currentMatrix[i][j];
            }
          }
        }
      }
    } else {
      const startFromRow = Math.abs(rowDifference);
      for (let i = startFromRow; i < currentRows; i++) {
        for (let j = 0; j < Math.min(cols, currentCols); j++) {
          if (currentMatrix[i] && currentMatrix[i][j] !== undefined) {
            const newRowIndex = i - startFromRow;
            newMatrix[newRowIndex][j] = currentMatrix[i][j];
          }
        }
      }
    }
    matrix.set(newMatrix);
  }, [rows, cols, matrix.get(), createMatrix]);

  const getCursorClass = useCallback(() => {
    const draggingModes = {
      toggle: "cursor-crosshair",
      activate: "cursor-copy",
      deactivate: "cursor-not-allowed",
    };
    if (isDragging) {
      return draggingModes[dragMode] || "cursor-default";
    }
    return "cursor-pointer";
  }, [isDragging, dragMode]);
  const toggleCell = useCallback(
    (i: number, j: number, forceValue: number | null = null) => {
      const currentMatrix = matrix.get();
      const newMatrix: number[][] = currentMatrix.map((row: any) => [...row]);

      if (forceValue !== null) {
        newMatrix[i][j] = forceValue;
      } else {
        newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0;
      }

      matrix.set(newMatrix);
    },
    [isDragging]
  );

  const handleMouseDown = useCallback(
    (i: number, j: number) => {
      setIsDragging(true);
      const dragModes = {
        toggle: () => toggleCell(i, j),
        activate: () => toggleCell(i, j, 1),
        deactivate: () => toggleCell(i, j, 0),
      };
      dragModes[dragMode]();
    },
    [toggleCell, dragMode]
  );

  const handleMouseEnter = useCallback(
    (i: number, j: number) => {
      if (isDragging) {
        const dragModes = {
          toggle: () => toggleCell(i, j),
          activate: () => toggleCell(i, j, 1),
          deactivate: () => toggleCell(i, j, 0),
        };
        dragModes[dragMode]();
      }
    },
    [isDragging, toggleCell, dragMode]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    },
    [isDragging]
  );

  useEffect(() => {
    updateDimensions();
  }, [rows, cols]);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  return {
    matrix,
    matrixRef,
    rows,
    setRows,
    cols,
    setCols,
    isDragging,
    dragMode,
    setDragMode,
    createMatrix,
    updateDimensions,
    getCursorClass,
    toggleCell,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseMove,
    matrixIsLocked,
    setMatrixIsLocked,
  };
};
