import { LockAxisButton } from "./LockAxisButton";

export const BottomLeftPanel = ({
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