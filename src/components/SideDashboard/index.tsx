import { useSideDashboard } from "./useSideDashboard";
import type { PluginProps } from "../MatrixEditor";

type editorToolsProps = {
  setPanelActionLabel: (
    panelActionLabel: {
      content: string;
      color: string;
    } | null
  ) => void;
  panelActionLabel: {
    content: string;
    color: string;
  } | null;
};
export const SideDashboard = ({
  editorTools,
  matrixRef,
  matrix,
  setMatrix,
  dragMode,
  setDragMode,
  matrixIsLocked,
  setMatrixIsLocked,
}: {
  editorTools?: React.ComponentType<
    Omit<PluginProps, "rows" | "setRows" | "cols" | "setCols" | "isDragging"> &
      editorToolsProps
  >[];
  matrixRef: React.RefObject<HTMLDivElement | null>;
  matrix: number[][];
  setMatrix: (matrix: number[][]) => void;
  dragMode: "toggle" | "activate" | "deactivate";
  setDragMode: (mode: "toggle" | "activate" | "deactivate") => void;
  matrixIsLocked: boolean;
  setMatrixIsLocked: (matrixIsLocked: boolean) => void;
}) => {
  const { panelActionLabel, setPanelActionLabel, toggleModeLabels } =
    useSideDashboard({ matrix, setMatrix });
  let panelLabel = "";
  let panelButton = "";
  if (panelActionLabel) {
    [panelLabel, panelButton] = panelActionLabel.content.split(":");
  }
  const { height } = matrixRef?.current?.getBoundingClientRect() || {
    height: 0,
  };
  return (
    <div
      className="flex flex-col flex-wrap gap-4 border-l border-gray-400 h-fit w-fit relative"
      style={{ maxHeight: height }}
    >
      <div className="-rotate-90 absolute flex flex-col items-center -top-[-50%] -left-[20px] w-0 h-0">
        <span
          className={[
            "text-xs w-fit h-fit whitespace-nowrap text-md transition-all duration-150 ease-in-out bg-gray-700 px-2 ",
            panelActionLabel?.content ? panelActionLabel.color : "transparent",
          ].join(" ")}
        >
          <i
            className={[
              "",
              panelActionLabel?.content
                ? panelActionLabel.color
                : "transparent",
            ].join(" ")}
          >
            {panelLabel}
          </i>
        </span>
      </div>
      {editorTools?.map((Tool, index) => (
        <Tool
          key={index}
          matrixRef={matrixRef}
          dragMode={dragMode}
          setDragMode={setDragMode}
          matrix={matrix}
          setMatrix={setMatrix}
          matrixIsLocked={matrixIsLocked}
          setMatrixIsLocked={setMatrixIsLocked}
          setPanelActionLabel={setPanelActionLabel}
          panelActionLabel={panelActionLabel}
        />
      ))}
    </div>
  );
};
