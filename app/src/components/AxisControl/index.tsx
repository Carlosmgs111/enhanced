import { useEffect } from "react";
import { useAxisController } from "./useAxisController";
import { MiddleLeftPanel } from "./MiddleLeftPanel";
import { BottomLeftPanel } from "./BottomLeftPanel";
import { BottomMiddlePanel } from "./BottomMiddlePanel";

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
          <MiddleLeftPanel
            rows={rows}
            setRows={setRows}
            axisIsLocked={false}
            setAxisLabel={setPanelActionLabel}
          />
        ),
        bottomLeft: (
          <BottomLeftPanel
            axisIsLocked={false}
            setAxisLabel={setPanelActionLabel}
            setAxisIsLocked={setActivated}
          />
        ),
        bottomMiddle: (
          <BottomMiddlePanel
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
                <MiddleLeftPanel
                  rows={rows}
                  axisIsLocked={false}
                  setAxisLabel={setPanelActionLabel}
                  setRows={setRows}
                />
              ),
              bottomLeft: (
                <BottomLeftPanel
                  axisIsLocked={false}
                  setAxisLabel={setPanelActionLabel}
                  setAxisIsLocked={setActivated}
                />
              ),
              bottomMiddle: (
                <BottomMiddlePanel
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

      <span
        className={[
          "absolute text-green-500 text-xs top-1/2 -right-[4px] w-0 h-0 items-center whitespace-nowrap text-md transition-all duration-200 ease-in-out",
        ].join(" ")}
      ></span>
    </div>
  );
};
