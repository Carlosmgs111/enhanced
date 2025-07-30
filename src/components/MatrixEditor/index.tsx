import { useMatrixEditor } from "./useMatrixEditor.ts";
import { useMemo } from "react";
import { SideDashboard } from "../SideDashboard/index.tsx";
import { PixelDot } from "./PixelDot";

export interface PluginProps {
  matrixRef: React.RefObject<HTMLDivElement | null>;
  rows: number;
  setRows: (rows: number) => void;
  cols: number;
  setCols: (cols: number) => void;
  matrix: any;
  setMatrix: (matrix: any) => void;
  dragMode: "toggle" | "activate" | "deactivate";
  setDragMode: (mode: "toggle" | "activate" | "deactivate") => void;
  isDragging: boolean;
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
  const {
    matrix,
    rows,
    setRows,
    cols,
    setCols,
    isDragging,
    dragMode,
    setDragMode,
    matrixIsLocked,
    setMatrixIsLocked,
    matrixRef,
    getCursorClass,
    handleMouseDown,
    handleMouseEnter,
  } = useMatrixEditor();

  return (
    <div className="flex p-10 gap-8 ">
      {matrixTools?.map((Plugin, index) => (
        <Plugin
          key={index}
          matrixRef={matrixRef}
          rows={rows}
          setRows={setRows}
          cols={cols}
          setCols={setCols}
          dragMode={dragMode}
          setDragMode={setDragMode}
          matrix={matrix}
          setMatrix={matrix.set}
          matrixIsLocked={matrixIsLocked}
          setMatrixIsLocked={setMatrixIsLocked}
          isDragging={isDragging}
        />
      ))}
      <div
        ref={matrixRef}
        className={`grid gap-[1px] mb-4 z-1000 `}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          userSelect: "none", // ? Prevent text selection
        }}
      >
        {matrix
          .get()
          .map((row, i) =>
            row.map((cell, j) => (
              <PixelDot
                key={`${i}-${j}`}
                i={i}
                j={j}
                cell={cell}
                matrixIsLocked={matrixIsLocked}
                isDragging={isDragging}
                getCursorClass={getCursorClass}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
              ></PixelDot>
            ))
          )}
      </div>
      <SideDashboard
        setMatrix={matrix.set}
        matrix={matrix.get()}
        matrixRef={matrixRef}
        dragMode={dragMode}
        setDragMode={setDragMode}
        matrixIsLocked={matrixIsLocked}
        setMatrixIsLocked={setMatrixIsLocked}
        editorTools={editorTools}
      />
    </div>
  );
};
