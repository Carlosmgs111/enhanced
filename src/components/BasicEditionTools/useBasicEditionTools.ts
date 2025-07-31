import { useCallback } from "react";

const ACTIVE_COLOR = "#4CAF50";
const INACTIVE_COLOR = "#f0f0f0";

export const useBasicEditionTools = ({
  totalCells,
  cells,
  grid,
}: {
  totalCells: number;
  cells: any[];
  grid: any[];
}) => {
  const activateAll = useCallback(() => {
    console.log("activating all");
    for (let i = 0; i < totalCells; i++) {
      grid[i] = 1;
      cells[i].style.backgroundColor = ACTIVE_COLOR;
    }
  }, [grid, cells]);


  const deactivateAll = useCallback(() => {
    console.log("deactivating all");
    for (let i = 0; i < totalCells; i++) {
      grid[i] = 0;
      cells[i].style.backgroundColor = INACTIVE_COLOR;
    }
  }, [grid, cells]);

  return {
    activateAll,
    deactivateAll,
  };
};
