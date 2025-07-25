import { ControlPanel } from "./ControlPanel";
import { AxisControl } from "./AxisControl";
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
      <AxisControl
        axisIsLocked={axisIsLocked}
        setAxisIsLocked={setAxisIsLocked}
        rows={rows}
        setRows={setRows}
        cols={cols}
        setCols={setCols}
      >
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
      </AxisControl>
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
