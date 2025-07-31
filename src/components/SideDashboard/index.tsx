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
  matrix,
  setMatrix,
  gridRef,
  getGridHandling,
}: {
  editorTools?: React.ComponentType<
    Omit<PluginProps, "rows" | "setRows" | "cols" | "setCols" | "isDragging"> &
      editorToolsProps
  >[];
  matrix: any;
  setMatrix: (matrix: any) => void;
  getGridHandling: () => any;
  gridRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { panelActionLabel, setPanelActionLabel, toggleModeLabels } =
    useSideDashboard({ matrix, setMatrix });
  let panelLabel = "";
  let panelButton = "";
  if (panelActionLabel) {
    [panelLabel, panelButton] = panelActionLabel.content.split(":");
  }
  const { height } = gridRef?.current?.getBoundingClientRect() || {
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
          setPanelActionLabel={setPanelActionLabel}
          panelActionLabel={panelActionLabel}
          {...getGridHandling()}
        />
      ))}
    </div>
  );
};
