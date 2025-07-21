import { useState, useCallback } from "react";
import { Grid } from "lucide-react";
import { useStore } from '@nanostores/react';
import { matrix } from '../stores/matrixState';

export default function BinaryMatrixGenerator() {
  const [rows, setRows] = useState(17);
  const [cols, setCols] = useState(11);
  const matrixState = useStore(matrix);

  // Crear nueva matriz con dimensiones específicas
  const createMatrix = useCallback((r: number, c: number, fill = 0) => {
    return Array(r)
      .fill(null)
      .map(() => Array(c).fill(fill));
  }, []);

  // Actualizar dimensiones de la matriz
  const updateDimensions = useCallback(() => {
    const newMatrix: number[][] = createMatrix(rows, cols, 0);
    // Copiar valores existentes si es posible
    for (let i = 0; i < Math.min(rows, matrixState.length); i++) {
      for (let j = 0; j < Math.min(cols, matrixState[0]?.length || 0); j++) {
        if (matrixState[i] && matrixState[i][j] !== undefined) {
          newMatrix[i][j] = matrixState[i][j];
        }
      }
    }
    matrix.set(newMatrix);
  }, [rows, cols, matrixState, createMatrix]);

  // Toggle valor de celda
  const toggleCell = useCallback((i: number, j: number) => {
    const newMatrix: number[][] = matrix.get().map((row: any) => [...row]);
    newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0;
    matrix.set(newMatrix);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 ">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">
          Generador de Array Bidimensional Binario
        </h1>

        {/* Controles de dimensiones */}
        <div className="mb-6 bg-slate-50 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3 text-slate-700">
            Dimensiones
          </h2>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <label className="font-medium text-slate-600">Filas:</label>
              <input
                type="number"
                min="1"
                max="20"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-medium text-slate-600">Columnas:</label>
              <input
                type="number"
                min="1"
                max="20"
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={updateDimensions}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Grid size={16} />
              Aplicar
            </button>
          </div>
        </div>

        {/* Matriz visual */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-slate-700">
            Matriz Visual
          </h2>
          <div className="inline-block p-4">
            <div
              className="grid gap-[1px] "
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {matrixState.map((row, i) =>
                row.map((cell, j) => (
                  <button
                    key={`${i}-${j}`}
                    onClick={() => toggleCell(i, j)}
                    className={`w-8 h-8 border-[1px] text-sm font-bold transition-all duration-200 hover:scale-110 ${
                      cell === 1
                        ? "bg-gray-800 border-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
