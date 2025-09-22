export const LockAxisButton = ({
  axisIsLocked,
  setAxisIsLocked,
  setAxisLabel,
}: {
  axisIsLocked: boolean;
  setAxisIsLocked: (axisIsLocked: boolean) => void;
  setAxisLabel: (
    axisLabel: { content: string; color: string; axis: "rows" | "cols" } | null
  ) => void;
}) => {
  return (
    <button
      className={"outline-none"}
      // onMouseOver={() =>
      //   setAxisLabel({
      //     content: !axisIsLocked
      //       ? "Bloquear el control de ejes"
      //       : "⚠ Control de ejes bloqueado: Desbloquear ⚠",
      //     color: axisIsLocked ? "text-yellow-500" : "text-red-500",
      //     axis: "rows",
      //   })
      // }
      // onMouseLeave={() => setAxisLabel(null)}
      onClick={() => {
        setAxisLabel({
          content: axisIsLocked
            ? "Bloquear el control de ejes"
            : "⚠ Control de ejes bloqueado: Desbloquear ⚠",
          color: !axisIsLocked ? "text-yellow-500" : "text-red-500",
          axis: "rows",
        });
        setAxisIsLocked(!axisIsLocked);
      }}
    >
      {axisIsLocked ? "🔓" : "🔒"}
    </button>
  );
};
