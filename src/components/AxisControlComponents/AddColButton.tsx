export const RemoveColButton = ({
  axisIsLocked,
  setCols,
  cols,
  setAxisLabel,
}: {
  axisIsLocked: boolean;
  setCols: (cols: number) => void;
  cols: number;
  setAxisLabel: (
    axisLabel: { content: string; color: string; axis: "rows" | "cols" } | null
  ) => void;
}) => {
  return (
    <button
      disabled={axisIsLocked}
      className={[
        "absolute -top-2 -right-6 text-3xl font-semibold text-gray-600 transition-all duration-200 ease-in-out",
        axisIsLocked ? "!cursor-not-allowed !text-gray-400" : "",
      ].join(" ")}
      onClick={() => {
        setCols(cols + 1);
      }}
      // onMouseEnter={() =>
      //   setAxisLabel({
      //     content: !axisIsLocked
      //       ? "Agregar una columna"
      //       : "⚠ Control de ejes bloqueado: Desbloquear ⚠",
      //     color: axisIsLocked ? "text-red-500" : "text-green-500",
      //     axis: "cols",
      //   })
      // }
      // onMouseLeave={() => setAxisLabel(null)}
    >
      +
    </button>
  );
};
