import { useMatrixEditor } from "./useMatrixEditor.ts";
import { SideDashboard } from "../SideDashboard/index.tsx";

export interface PluginProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  gridHandling: any;
  rows: number;
  setRows: (rows: number) => void;
  cols: number;
  setCols: (cols: number) => void;
  matrix: any;
  setMatrix: (matrix: any) => void;
  dragMode: "toggle" | "activate" | "deactivate";
  setDragMode: (mode: "toggle" | "activate" | "deactivate") => void;
  matrixIsLocked: boolean;
  setMatrixIsLocked: (locked: boolean) => void;
  setPanels: (panels: any) => void;
}

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
export const MatrixEditor = ({
  matrixTools,
  editorTools,
}: {
  matrixTools?: React.ComponentType<PluginProps>[];
  editorTools?: React.ComponentType<
    Omit<PluginProps, "rows" | "setRows" | "cols" | "setCols" | "isDragging"> &
      editorToolsProps
  >[];
}) => {
  const { gridHandling, setPanels }: any = useMatrixEditor();
  const { gridRef, panels } = gridHandling;

  return (
    <div className="grid grid-cols-[repeat(3,auto)] grid-rows-[repeat(3,auto)] gap-4 ">
      <div id="top-left"> {panels.topLeft}</div>
      <div id="top-middle"> {panels.topMiddle}</div>
      <div id="top-right"> {panels.topRight}</div>
      <div id="middle-left">{panels.middleLeft}</div>
      <div id="middle-middle" className="max-w-[800px] overflow-scroll">
        <div ref={gridRef} className="grid gap-[0px] z-1000"></div>
      </div>
      <div id="middle-right">
        <SideDashboard
          editorTools={editorTools}
          gridHandling={gridHandling}
          setPanels={setPanels}
        />
      </div>
      <div id="bottom-left"> {panels.bottomLeft}</div>
      <div id="bottom-middle"> {panels.bottomMiddle}</div>
      <div id="bottom-right"> {panels.bottomRight}</div>
    </div>
  );
};
