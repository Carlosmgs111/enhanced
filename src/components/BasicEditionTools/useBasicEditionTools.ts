import { useCallback } from "react";

const ACTIVE_COLOR = "#4CAF50";
const INACTIVE_COLOR = "#f0f0f0";

export const useBasicEditionTools = ({
  totalCells,
  cells,
  grid,
  syncGridToMatrix,
}: {
  totalCells: number;
  cells: any[];
  grid: any[];
  syncGridToMatrix: () => void;
}) => {
  const activateAll = useCallback(() => {
    console.log("activating all");
    for (let i = 0; i < totalCells; i++) {
      grid.fill(1);
      cells[i].classList.add("bg-gray-700");
      cells[i].classList.add("border-white");
    }
    syncGridToMatrix();
  }, [grid, cells]);


  const deactivateAll = useCallback(() => {
    console.log("deactivating all");
    for (let i = 0; i < totalCells; i++) {
      grid.fill(0);
      cells[i].classList.remove("bg-gray-700");
      cells[i].classList.remove("border-white");
    }
    syncGridToMatrix();
  }, [grid, cells]);

  return {
    activateAll,
    deactivateAll,
  };
};
