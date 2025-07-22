import { ControlPanel } from "./ControlPanel";
import { useMatrixPanel } from "./useMatrixPanel";

export const MatrixPanel = () => {
  const {
    matrix,
    rows,
    setRows,
    cols,
    setCols,
    isDragging,
    dragMode,
    setDragMode,
    panelActionLabel,
    setPanelActionLabel,
    getCursorClass,
    handleMouseDown,
    handleMouseEnter,
    activateAll,
    deactivateAll,
    toggleModeLabels,
    downloadMatrix,
  } = useMatrixPanel();
  return (
    <div className="flex p-10 gap-8 ">
      {/* // ? Matrix panel */}
      <div className="inline-block w-fit h-fit ">
        <div
          className={`grid gap-[1px] mb-4 relative ${getCursorClass()}`}
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            userSelect: "none", // ? Prevent text selection
          }}
        >
          <div className="w-[1px] h-full border-l-[1px] border-dashed border-gray-400 absolute -left-4 top-0 flex items-center">
            <button
              className="absolute -top-2 -left-5 text-2xl font-thin text-gray-600"
              onClick={() => {
                setRows(rows + 1);
              }}
            >
              ↑
            </button>
            <div className=" transform -rotate-90 translate-x-[-24px] whitespace-nowrap w-0 h-0 flex flex-col items-center">
              {rows} filas
            </div>
            <button
              className="absolute -bottom-2 -left-5 text-2xl font-thin text-gray-600"
              onClick={() => {
                setRows(rows - 1);
              }}
            >
              ↓
            </button>
          </div>
          {matrix
            .get()
            .map((row, i) =>
              row.map((cell, j) => (
                <button
                  key={`${i}-${j}`}
                  onMouseDown={() => handleMouseDown(i, j)}
                  onMouseEnter={() => handleMouseEnter(i, j)}
                  onDragStart={(e) => e.preventDefault()}
                  className={`w-8 h-8 border-[1px] border-dotted border-gray-300 text-sm font-bold transition-all duration-200 hover:scale-110 ${
                    cell === 1 ? "bg-gray-700 border-white" : "hover:bg-gray-50"
                  } ${isDragging ? "select-none" : ""} ${getCursorClass()}`}
                ></button>
              ))
            )}
        </div>
        <div className="w-full h-[1px] border-t-[1px] border-dashed border-gray-400 relative">
          <button
            className="absolute -top-2 left-0 text-3xl font-thin text-gray-600"
            onClick={() => {
              setCols(cols - 1);
            }}
          >
            ←
          </button>
          <div className=" text-center">{cols} columnas</div>
          <button
            className="absolute -top-2 right-0 text-3xl font-thin text-gray-600"
            onClick={() => {
              setCols(cols + 1);
            }}
          >
            →
          </button>
        </div>
      </div>
      <ControlPanel
        {...{
          panelActionLabel,
          setPanelActionLabel,
          dragMode,
          setDragMode,
          activateAll,
          deactivateAll,
          toggleModeLabels,
          downloadMatrix,
        }}
      />
    </div>
  );
};
