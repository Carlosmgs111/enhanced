import { AddRowButton } from "./AddRowButton";
import { RemoveRowButton } from "./RemoveRowButton";

export const MiddleLeftPanel = ({
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
  return (
    <div className="w-fit h-full border-l-[1px] left-0 border-dashed border-gray-400 flex items-center relative">
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
