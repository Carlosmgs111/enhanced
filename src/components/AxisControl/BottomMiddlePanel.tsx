import { AddColButton } from "./AddColButton";
import { RemoveColButton } from "./RemoveColButton";

export const BottomMiddlePanel = ({
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