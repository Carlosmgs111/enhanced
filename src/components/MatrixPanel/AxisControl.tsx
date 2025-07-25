import { useState } from "react";

export const AxisControl = ({
  children,
  axisIsLocked,
  setAxisIsLocked,
  rows,
  setRows,
  cols,
  setCols,
}: {
  children: React.ReactNode;
  axisIsLocked: boolean;
  setAxisIsLocked: (axisIsLocked: boolean) => void;
  rows: number;
  setRows: (rows: number) => void;
  cols: number;
  setCols: (cols: number) => void;
}) => {
  const [axisLabel, setAxisLabel] = useState<{
    content: string;
    color: string;
  } | null>(null);
  return (
    <div className="inline-block w-fit h-fit ">
      <div
        className={`grid gap-[1px] mb-4 relative `}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          userSelect: "none", // ? Prevent text selection
        }}
      >
        <span className="absolute text-center left-0 -bottom-4 w-full h-fit text-xs whitespace-nowrap text-red-500 overflow-hidden">
          {axisIsLocked ? axisLabel?.content : axisLabel?.content}
        </span>
        <div className="w-[1px] h-full border-l-[1px] border-dashed border-gray-400 absolute -left-4 top-0 flex items-center">
          <button
            disabled={axisIsLocked}
            className={[
              "absolute -top-2 -left-5 text-2xl font-thin text-gray-600 transition-all duration-200 ease-in-out",
              axisIsLocked ? "!cursor-not-allowed !text-gray-400" : "",
            ].join(" ")}
            onClick={() => {
              setRows(rows + 1);
            }}
          >
            ↑
          </button>
          <div className="transform -rotate-90 translate-x-[-24px] whitespace-nowrap w-0 h-0 flex flex-col items-center">
            {rows} filas
          </div>
          <button
            disabled={axisIsLocked}
            className={[
              "absolute -bottom-2 -left-5 text-2xl font-thin text-gray-600 transition-all duration-200 ease-in-out",
              axisIsLocked ? "!cursor-not-allowed !text-gray-400" : "",
            ].join(" ")}
            onClick={() => {
              setRows(rows - 1);
            }}
          >
            ↓
          </button>
        </div>
        <div
          className={
            "w-8 h-8 border-l-[1px] border-b-[1px] border-gray-400  absolute -left-11 -bottom-11 flex items-center justify-center"
          }
        >
          <button
            className={"outline-none"}
            onMouseOver={() =>
              setAxisLabel({
                content: !axisIsLocked
                  ? "Bloquear el control de ejes"
                  : "⚠ Control de ejes bloqueado: Desbloquear ⚠",
                color: axisIsLocked ? "text-red-500" : "text-green-500",
              })
            }
            onMouseLeave={() => setAxisLabel(null)}
            onClick={() => {
              setAxisLabel({
                content: axisIsLocked
                  ? "Bloquear el control de ejes"
                  : "⚠ Control de ejes bloqueado: Desbloquear ⚠",
                color: !axisIsLocked ? "text-red-500" : "text-green-500",
              });
              setAxisIsLocked(!axisIsLocked);
            }}
          >
            {axisIsLocked ? "🔓" : "🔒"}
          </button>
        </div>
        {children}
      </div>
      <div className="w-full h-[1px] border-t-[1px] border-dashed border-gray-400 relative">
        <button
          disabled={axisIsLocked}
          className={[
            "absolute -top-2 left-0 text-3xl font-thin text-gray-600 transition-all duration-200 ease-in-out",
            axisIsLocked ? "!cursor-not-allowed !text-gray-400" : "",
          ].join(" ")}
          onClick={() => {
            setCols(cols - 1);
          }}
        >
          ←
        </button>
        <div className=" text-center">{cols} columnas</div>
        <button
          disabled={axisIsLocked}
          className={[
            "absolute -top-2 right-0 text-3xl font-thin text-gray-600 transition-all duration-200 ease-in-out",
            axisIsLocked ? "!cursor-not-allowed !text-gray-400" : "",
          ].join(" ")}
          onClick={() => {
            setCols(cols + 1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};
