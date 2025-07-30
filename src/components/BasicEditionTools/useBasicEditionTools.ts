import { useCallback } from "react";

export const useBasicEditionTools = ({
  matrix,
  setMatrix,
}: {
  matrix: any;
  setMatrix: any;
}) => {
  const activateAll = useCallback(() => {
    const currentMatrix = matrix;
    const newMatrix = currentMatrix.map((row: any) => row.map(() => 1));
    setMatrix(newMatrix);
  }, [matrix]);

  const deactivateAll = useCallback(() => {
    const currentMatrix = matrix;
    const newMatrix = currentMatrix.map((row: any) => row.map(() => 0));
    setMatrix(newMatrix);
  }, [matrix]);

  return {
    activateAll,
    deactivateAll,
  };
};
