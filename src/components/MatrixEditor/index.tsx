import { useMatrixEditor } from "./useMatrixEditor.ts";
import { SideDashboard } from "../SideDashboard/index.tsx";

export interface PluginProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  getGridHandling: () => any;
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
  const { getGridHandling }: any = useMatrixEditor();
  const { gridRef } = getGridHandling();

  return (
    <div className="flex p-10 gap-8 ">
      {matrixTools?.map((Plugin, index) => (
        <Plugin key={index} {...getGridHandling()} />
      ))}
      <div ref={gridRef} className="grid gap-[0px] z-1000"></div>
      <SideDashboard editorTools={editorTools} {...getGridHandling()} />
    </div>
  );
};
