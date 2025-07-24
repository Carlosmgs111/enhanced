import { ControlPanel } from "./ControlPanel";
import { useMatrixPanel } from "./useMatrixPanel";
import Corners from "../Corners";
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
    saveMatrix,
    character,
    setCharacter,
    matrixIsLocked,
    setMatrixIsLocked,
    axisIsLocked,
    setAxisIsLocked,
  } = useMatrixPanel();
  return (
    <div className="flex p-10 gap-8 ">
      {/* // ? Matrix panel */}
      <div className="inline-block w-fit h-fit ">
        <div
          className={`grid gap-[1px] mb-4 relative `}
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            userSelect: "none", // ? Prevent text selection
          }}
        >
          <span className="absolute text-center left-0 bottom-0 w-full h-0 border-l-[1px] border-dashed border-gray-400 text-xs whitespace-nowrap text-red-500">
            {axisIsLocked ? "Control de ejes bloqueado " : ""}
          </span>
          <div className="w-[1px] h-full border-l-[1px] border-dashed border-gray-400 absolute -left-4 top-0 flex items-center">
            <button
              disabled={axisIsLocked}
              className={[
                "absolute -top-2 -left-5 text-2xl font-thin text-gray-600",
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
                "absolute -bottom-2 -left-5 text-2xl font-thin text-gray-600",
                axisIsLocked ? "!cursor-not-allowed !text-gray-400" : "",
              ].join(" ")}
              onClick={() => {
                setRows(rows - 1);
              }}
            >
              ↓
            </button>
          </div>
          <div className="w-8 h-8 border-l-[1px] border-b-[1px] border-gray-400  absolute -left-11 -bottom-11 flex items-center justify-center">
            <button
              className="outline-none"
              onClick={() => setAxisIsLocked(!axisIsLocked)}
            >
              {axisIsLocked ? "🔓" : "🔒"}
            </button>
          </div>
          {matrix.get().map((row, i) =>
            row.map((cell, j) => (
              <Corners size={2} bordersFull={matrixIsLocked}>
                <button
                  key={`${i}-${j}`}
                  disabled={matrixIsLocked}
                  onMouseDown={() => handleMouseDown(i, j)}
                  onMouseEnter={() => handleMouseEnter(i, j)}
                  onDragStart={(e) => e.preventDefault()}
                  className={`w-8 aspect-square border-[1px] border-dotted border-gray-300 text-sm font-bold  ${
                    cell === 1 ? "bg-gray-700 border-white" : "hover:bg-gray-50"
                  } ${isDragging ? "select-none" : ""} ${getCursorClass()} ${
                    matrixIsLocked ? "!cursor-not-allowed" : ""
                  }`}
                ></button>
              </Corners>
            ))
          )}
        </div>
        <div className="w-full h-[1px] border-t-[1px] border-dashed border-gray-400 relative">
          <button
            disabled={axisIsLocked}
            className={[
              "absolute -top-2 left-0 text-3xl font-thin text-gray-600",
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
              "absolute -top-2 right-0 text-3xl font-thin text-gray-600",
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
          saveMatrix,
          character,
          setCharacter,
          matrixIsLocked,
          setMatrixIsLocked,
        }}
      />
    </div>
  );
};
