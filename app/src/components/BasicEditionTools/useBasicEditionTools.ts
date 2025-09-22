import { useCallback } from "react";

export const useBasicEditionTools = ({
  totalCells,
  cells,
  grid,
  updateCell,
}: {
  totalCells: number;
  cells: any[];
  grid: any[];
  syncGridToMatrix: () => void;
  updateCell: (index: number, value: 0 | 1) => void;
}) => {
  
  const activateAll = useCallback(() => {
    console.log("activating all");
    for (let i = 0; i < totalCells; i++) {
      updateCell(i, 1);
    }
  }, [grid, cells]);


  const deactivateAll = useCallback(() => {
    console.log("deactivating all");
    for (let i = 0; i < totalCells; i++) {
      updateCell(i, 0);
    }
  }, [grid, cells]);

  return {
    activateAll,
    deactivateAll,
  };
};
