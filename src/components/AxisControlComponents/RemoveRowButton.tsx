export const RemoveRowButton = ({
  axisIsLocked,
  setRows,
  rows,
  setAxisLabel,
}: {
  axisIsLocked: boolean;
  setRows: (rows: number) => void;
  rows: number;
  setAxisLabel: (
    axisLabel: { content: string; color: string; axis: "rows" | "cols" } | null
  ) => void;
}) => {
  return (
    <button
      disabled={axisIsLocked}
      className={[
        "absolute -top-1 -left-5 text-2xl font-semibold text-gray-600 transition-all duration-200 ease-in-out",
        axisIsLocked ? "!cursor-not-allowed !text-gray-400" : "",
      ].join(" ")}
      onClick={() => {
        setRows(rows - 1);
      }}
      // onMouseEnter={() =>
      //   setAxisLabel({
      //     content: !axisIsLocked
      //       ? "Eliminar una fila"
      //       : "⚠ Control de ejes bloqueado: Desbloquear ⚠",
      //     color: axisIsLocked ? "text-red-500" : "text-yellow-500",
      //     axis: "rows",
      //   })
      // }
      // onMouseLeave={() => setAxisLabel(null)}
    >
      -
    </button>
  );
};
