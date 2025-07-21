import { useEffect, useState, useCallback } from "react";
import { useStore } from "@nanostores/react";
import { matrix } from "../stores/matrixState";

export const MatrixPanel = () => {
  const [rows, setRows] = useState(17);
  const [cols, setCols] = useState(11);
  // ? ⬇️ important for it works
  useStore(matrix);

  // ? create matrix with specific dimensions
  const createMatrix = useCallback((r: number, c: number, fill = 0) => {
    return Array(r)
      .fill(null)
      .map(() => Array(c).fill(fill));
  }, []);

  useEffect(() => {
    updateDimensions();
  }, [rows, cols]);

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

  // ? toggle cell value
  const toggleCell = useCallback((i: number, j: number) => {
    const newMatrix: number[][] = matrix.get().map((row: any) => [...row]);
    newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0;
    matrix.set(newMatrix);
  }, []);

  return (
    <div className="inline-block p-4 ">
      <div
        className="grid gap-[1px] mb-4 relative"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        <div className="w-[1px] h-full border-l-[1px] border-dashed border-gray-400 absolute -left-4 top-0 flex items-center">
          <button
            className="absolute -top-2 -left-5 text-2xl font-thin text-gray-600"
            onClick={() => {
              setRows(rows + 1);
            }}
          >
            ↑
          </button>
          <div className=" transform -rotate-90 translate-x-[-24px] whitespace-nowrap w-0 h-0 flex flex-col items-center">
            {rows} filas
          </div>
          <button
            className="absolute -bottom-2 -left-5 text-2xl font-thin text-gray-600"
            onClick={() => {
              setRows(rows - 1);
            }}
          >
            ↓
          </button>
        </div>
        {matrix
          .get()
          .map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => toggleCell(i, j)}
                className={`w-8 h-8 border-[1px] border-dotted border-gray-300 text-sm font-bold transition-all duration-200 hover:scale-110 ${
                  cell === 1 ? "bg-gray-700 border-white" : "hover:bg-gray-50"
                }`}
              ></button>
            ))
          )}
      </div>
      <div className="w-full h-[1px] border-t-[1px] border-dashed border-gray-400 relative">
        <button
          className="absolute -top-2 left-0 text-3xl font-thin text-gray-600"
          onClick={() => {
            setCols(cols - 1);
          }}
        >
          ←
        </button>
        <div className=" text-center">{cols} columnas</div>
        <button
          className="absolute -top-2 right-0 text-3xl font-thin text-gray-600"
          onClick={() => {
            setCols(cols + 1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};
