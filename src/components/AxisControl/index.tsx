import { useEffect } from "react";
import { AddColButton } from "../AxisControlComponents/RemoveColButton";
import { AddRowButton } from "../AxisControlComponents/AddRowButton";
import { RemoveColButton } from "../AxisControlComponents/AddColButton";
import { RemoveRowButton } from "../AxisControlComponents/RemoveRowButton";
import { LockAxisButton } from "../AxisControlComponents/LockAxisButton";
import { useAxisController } from "./useAxisController";

const AxisControlMiddleLeftPanel = ({
  axisIsLocked,
  setRows,
  rows,
  setAxisLabel,
}: {
  axisIsLocked: boolean;
  setRows: (rows: number) => void;
  rows: number;
  setAxisLabel: (
    axisLabel: {
      content: string;
      color: string;
      axis: "rows" | "cols";
    } | null
  ) => void;
}) => {
  console.log("AxisControllerMiddleLeftPanel", rows);
  return (
    <div className="w-fit h-full border-l-[1px] border-dashed border-gray-400 flex items-center relative">
      <AddRowButton
        axisIsLocked={axisIsLocked}
        setRows={setRows}
        rows={rows}
        setAxisLabel={setAxisLabel}
      />
      <div className="transform -rotate-90 translate-x-[-24px] whitespace-nowrap w-0 h-0 flex flex-col items-center">
        {rows} filas
      </div>
      <RemoveRowButton
        axisIsLocked={axisIsLocked}
        setRows={setRows}
        rows={rows}
        setAxisLabel={setAxisLabel}
      />
    </div>
  );
};

const AxisControlBottomLeftPanel = ({
  axisIsLocked,
  setAxisIsLocked,
  setAxisLabel,
}: {
  axisIsLocked: boolean;
  setAxisIsLocked: (axisIsLocked: boolean) => void;
  setAxisLabel: (
    axisLabel: {
      content: string;
      color: string;
      axis: "rows" | "cols";
    } | null
  ) => void;
}) => {
  return (
    <div
      className={
        "w-8 h-8 border-l-[1px] border-b-[1px] border-gray-400 flex items-center justify-center"
      }
    >
      <LockAxisButton
        axisIsLocked={axisIsLocked}
        setAxisIsLocked={setAxisIsLocked}
        setAxisLabel={setAxisLabel}
      />
    </div>
  );
};

const AxisControlBottomMiddlePanel = ({
  axisIsLocked,
  setAxisLabel,
  cols,
  setCols,
}: {
  axisIsLocked: boolean;
  setAxisLabel: (
    axisLabel: {
      content: string;
      color: string;
      axis: "rows" | "cols";
    } | null
  ) => void;
  cols: number;
  setCols: (cols: number) => void;
}) => {
  console.log("AxisControlBottomMiddlePanel", { cols });
  return (
    <div className="w-full h-[1px] -bottom-8 border-t-[1px] border-dashed border-gray-400 relative z-[1000]">
      <AddColButton
        axisIsLocked={axisIsLocked}
        setCols={setCols}
        cols={cols}
        setAxisLabel={setAxisLabel}
      />
      <div className=" text-center">{cols} columnas</div>
      <RemoveColButton
        axisIsLocked={axisIsLocked}
        setCols={setCols}
        cols={cols}
        setAxisLabel={setAxisLabel}
      />
    </div>
  );
};

export const AxisControl = ({
  setPanelActionLabel,
  setPanels,
  cols,
  setCols,
  rows,
  setRows,
}: {
  setPanelActionLabel: (
    panelActionLabel: {
      content: string;
      color: string;
    } | null
  ) => void;
  setMiddleLeftPanel: (panel: React.ReactNode) => void;
  setBottomLeftPanel: (panel: React.ReactNode) => void;
  setBottomMiddlePanel: (panel: React.ReactNode) => void;
  setPanels: (panels: any) => void;
  cols: number;
  setCols: (cols: number) => void;
  rows: number;
  setRows: (rows: number) => void;
}) => {
  const { activated, setActivated } = useAxisController();

  useEffect(() => {
    if (activated) {
      setPanels({
        middleLeft: (
          <AxisControlMiddleLeftPanel
            rows={rows}
            setRows={setRows}
            axisIsLocked={false}
            setAxisLabel={setPanelActionLabel}
          />
        ),
        bottomLeft: (
          <AxisControlBottomLeftPanel
            axisIsLocked={false}
            setAxisLabel={setPanelActionLabel}
            setAxisIsLocked={setActivated}
          />
        ),
        bottomMiddle: (
          <AxisControlBottomMiddlePanel
            cols={cols}
            setCols={setCols}
            axisIsLocked={false}
            setAxisLabel={setPanelActionLabel}
          />
        ),
      });
    }
    if (!activated) {
      setPanels({
        middleLeft: null,
        bottomLeft: null,
        bottomMiddle: null,
      });
    }
  }, [activated, cols, rows]);
  return (
    <div className=" flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative">
      <button
        onClick={() => {
          if (activated) {
            setActivated(false);
            setPanels({
              middleLeft: null,
              bottomLeft: null,
              bottomMiddle: null,
            });
          }
          if (!activated) {
            setActivated(true);
            setPanels({
              middleLeft: (
                <AxisControlMiddleLeftPanel
                  rows={rows}
                  axisIsLocked={false}
                  setAxisLabel={setPanelActionLabel}
                  setRows={setRows}
                />
              ),
              bottomLeft: (
                <AxisControlBottomLeftPanel
                  axisIsLocked={false}
                  setAxisLabel={setPanelActionLabel}
                  setAxisIsLocked={setActivated}
                />
              ),
              bottomMiddle: (
                <AxisControlBottomMiddlePanel
                  cols={cols}
                  axisIsLocked={false}
                  setAxisLabel={setPanelActionLabel}
                  setCols={setCols}
                />
              ),
            });
          }
        }}
        onMouseEnter={() =>
          setPanelActionLabel({
            content: "Activar control de ejes",
            color: "text-blue-500",
          })
        }
        onMouseLeave={() => setPanelActionLabel(null)}
        className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 text-gray-600 hover:bg-gray-200 outline-none active:bg-gray-200 ${
          activated ? "bg-gray-600 text-yellow-500" : ""
        }`}
      >
        ⇔
      </button>
      <button onClick={() => setCols(cols + 1)}>+</button>

      <span
        className={[
          "absolute text-green-500 text-xs top-1/2 -right-[4px] w-0 h-0 items-center whitespace-nowrap text-md transition-all duration-200 ease-in-out",
        ].join(" ")}
      ></span>
    </div>
  );
};
