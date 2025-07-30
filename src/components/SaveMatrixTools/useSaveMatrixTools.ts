import { useEffect, useState, useCallback } from "react";

export const useSaveMatrixTools = ({
  matrix,
  setPanelActionLabel,
}: {
  matrix: number[][];
  setPanelActionLabel: (
    panelActionLabel: { content: string; color: string } | null
  ) => void;
}) => {
  const [character, setCharacter] = useState(() => "");
  const [matrixData, setMatrixData] = useState(() => matrix);

  useEffect(() => {
    setMatrixData(matrix);
  }, [matrix]);

  const downloadMatrix = useCallback(async () => {
    console.log({ matrixData });
    const defaultFileName = "matrix.json";
    const jsonBlob = new Blob([JSON.stringify(matrixData, null, 2)], {
      type: "application/json",
    });

    try {
      if (!window?.showSaveFilePicker) {
        alert(
          "Tu navegador no soporta la descarga avanzada. Usa Chrome o Edge."
        );
        return;
      }
      const fileHandle = await window?.showSaveFilePicker({
        suggestedName: defaultFileName,
        types: [
          {
            description: "Archivo JSON",
            accept: { "application/json": [".json"] },
          },
        ],
      });
      const writable = await fileHandle.createWritable();
      await writable.write(jsonBlob);
      await writable.close();
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Error al guardar el archivo:", err);
      }
    }
  }, [matrixData]);
  
  const saveMatrix = async () => {
    console.log({ character });
    if (!character) {
      setPanelActionLabel({
        content: "Por favor, ingresa un carácter:shake",
        color: "text-red-500",
      });
      setTimeout(() => {
        setPanelActionLabel(null);
      }, 2000);
      return;
    }
    const matrixData = matrix;
    fetch("http://localhost:3000/api/dotted-font", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matrix: matrixData, character }),
    });
  };
  return {
    character,
    setCharacter,
    downloadMatrix,
    saveMatrix,
  };
};
