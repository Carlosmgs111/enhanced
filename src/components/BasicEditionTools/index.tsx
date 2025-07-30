import { useBasicEditionTools } from "./useBasicEditionTools";

export const BasicEditionTools = ({
  matrix,
  setMatrix,
  dragMode,
  setDragMode,
  matrixIsLocked,
  setMatrixIsLocked,
  setPanelActionLabel,
}: {
  matrix: any;
  setMatrix: any;
  dragMode: "toggle" | "activate" | "deactivate";
  setDragMode: (mode: "toggle" | "activate" | "deactivate") => void;
  matrixIsLocked: boolean;
  setMatrixIsLocked: (matrixIsLocked: boolean) => void;
  setPanelActionLabel: (
    panelActionLabel: {
      content: string;
      color: string;
    } | null
  ) => void;
}) => {
  const { activateAll, deactivateAll } = useBasicEditionTools({
    matrix,
    setMatrix,
  });
  return (
    <div className=" flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative">
      <button
        onClick={() => setDragMode("toggle")}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: !matrixIsLocked
              ? "Alternar el estado de cada celda"
              : "⚠ Desbloquea la matriz para continuar ⚠",
            color: matrixIsLocked ? "text-red-500" : "text-yellow-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${
          dragMode === "toggle"
            ? "bg-gray-600 text-yellow-500 "
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        ◩
      </button>
      <button
        onClick={() => setDragMode("activate")}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: !matrixIsLocked
              ? "Siempre activar las celdas (pintar)"
              : "⚠ Desbloquea la matriz para continuar ⚠",
            color: matrixIsLocked ? "text-red-500" : "text-green-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${
          dragMode === "activate"
            ? "bg-gray-600 text-green-500 "
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        ▣
      </button>
      <button
        onClick={() => setDragMode("deactivate")}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: !matrixIsLocked
              ? "Siempre desactivar las celdas (borrar)"
              : "⚠ Desbloquea la matriz para continuar ⚠",
            color: matrixIsLocked ? "text-red-500" : "text-red-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${
          dragMode === "deactivate"
            ? "bg-gray-600 text-red-500 "
            : "text-gray-600 hover:bg-gray-200"
        }`}
      >
        ☐
      </button>
      <button
        onClick={() => !matrixIsLocked && activateAll()}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: !matrixIsLocked
              ? "Seleccionar todas las celdas"
              : "⚠ Desbloquea la matriz para continuar ⚠",
            color: matrixIsLocked ? "text-red-500" : "text-green-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 text-gray-600 hover:bg-gray-200 outline-none`}
      >
        ☑
      </button>
      <button
        onClick={() => !matrixIsLocked && deactivateAll()}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: !matrixIsLocked
              ? "Limpiar todas las celdas"
              : "⚠ Desbloquea la matriz para continuar ⚠",
            color: matrixIsLocked ? "text-red-500" : "text-red-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 text-gray-600 hover:bg-gray-200 outline-none active:bg-gray-200`}
      >
        ☒
      </button>
      <button
        onClick={() => {
          setMatrixIsLocked(!matrixIsLocked);
          setPanelActionLabel({
            content: !matrixIsLocked ? "Desbloquear matriz" : "Bloquear matriz",
            color: "text-yellow-500",
          });
        }}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: matrixIsLocked
              ? "Matrix bloqueada: Desbloquear matriz"
              : "Bloquear matriz",
            color: matrixIsLocked ? "text-red-500" : "text-yellow-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 text-gray-600 hover:bg-gray-200`}
      >
        {matrixIsLocked ? "🔓" : "🔒"}
      </button>
      <span
        className={[
          "absolute -bottom-2 text-xs rotate-90 top-1/2 -right-[16px] w-0 h-0 flex flex-col items-center whitespace-nowrap text-md",
          dragMode === "toggle"
            ? "text-yellow-500 "
            : dragMode === "activate"
            ? "text-green-500 "
            : "text-red-500 ",
        ].join(" ")}
      >
        {/* {toggleModeLabels[dragMode]} */}
      </span>
    </div>
  );
};
