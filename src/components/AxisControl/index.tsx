import { useState, useEffect, useMemo } from "react";
import { AddRowButton } from "./AddRowButton";
import { RemoveRowButton } from "./RemoveRowButton";
import { AddColButton } from "./AddColButton";
import { RemoveColButton } from "./RemoveColButton";
import { LockAxisButton } from "./LockAxisButton";

export const AxisControl = ({
  matrixRef,
  rows,
  setRows,
  cols,
  setCols,
}: {
  matrixRef: React.RefObject<HTMLDivElement | null>;
  rows: number;
  setRows: (rows: number) => void;
  cols: number;
  setCols: (cols: number) => void;
}) => {
  const memoizedPosition = useMemo(() => {
    const position = matrixRef?.current?.getBoundingClientRect() || {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
    return position;
  }, [matrixRef?.current?.getBoundingClientRect()]);
  console.log(memoizedPosition);
  const { width, height, top, left } = memoizedPosition;
  const [axisIsLocked, setAxisIsLocked] = useState(false);
  const [axisLabel, setAxisLabel] = useState<{
    content: string;
    color: string;
    axis: "rows" | "cols";
  } | null>(null);
  useEffect(() => {
    const position = matrixRef?.current?.getBoundingClientRect() || {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    };
    console.log(position);
    // setPosition(position);
  }, [memoizedPosition]);

  useEffect(() => {
    console.log(matrixRef?.current?.getBoundingClientRect());
  }, [matrixRef?.current?.getBoundingClientRect().x , matrixRef?.current?.getBoundingClientRect().y]);

  return (
    <div className="inline-block w-fit h-fit absolute -z-100 " style={{ top, left }}>
      <div className="relative">
        <span
          className={[
            "absolute text-center left-0 w-full h-fit text-xs whitespace-nowrap overflow-hidden bg-gray-700 px-2",
            axisLabel?.axis === "rows" ? "-top-4" : "-bottom-4",
            axisLabel?.color,
          ].join(" ")}
        >
          <i className={axisLabel?.color}>{axisLabel?.content}</i>
        </span>
        <div className="w-[1px] h-full border-l-[1px] border-dashed border-gray-400 absolute -left-4 top-0 flex items-center">
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
        <div
          className={
            "w-8 h-8 border-l-[1px] border-b-[1px] border-gray-400  absolute -left-11 -bottom-11 flex items-center justify-center"
          }
        >
          <LockAxisButton
            axisIsLocked={axisIsLocked}
            setAxisIsLocked={setAxisIsLocked}
            setAxisLabel={setAxisLabel}
          />
        </div>
        <div className="w-full h-fit z-[-1000]" style={{ width, height }}></div>
      </div>
      <div className="w-full h-[1px] -bottom-4 border-t-[1px] border-dashed border-gray-400 relative">
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
    </div>
  );
};
