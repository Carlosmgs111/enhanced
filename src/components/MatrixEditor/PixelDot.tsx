import Corners from "../Corners";

export const PixelDot = ({
  i,
  j,
  cell,
  matrixIsLocked,
  isDragging,
  getCursorClass,
  handleMouseDown,
  handleMouseEnter,
}: {
  i: number;
  j: number;
  cell: number;
  matrixIsLocked: boolean;
  isDragging: boolean;
  getCursorClass: () => string;
  handleMouseDown: (i: number, j: number) => void;
  handleMouseEnter: (i: number, j: number) => void;
}) => {
  return (
    <Corners size={2} bordersFull={matrixIsLocked}>
      <button
        key={`${i}-${j}`}
        disabled={matrixIsLocked}
        onMouseDown={() => handleMouseDown(i, j)}
        onMouseEnter={() => handleMouseEnter(i, j)}
        onDragStart={(e) => e.preventDefault()}
        className={`w-6 aspect-square border-[1px] border-dotted border-gray-300 text-sm font-bold  ${
          cell === 1 ? "bg-gray-700 border-white" : "hover:bg-gray-50"
        } ${isDragging ? "select-none" : ""} ${getCursorClass()} ${
          matrixIsLocked ? "!cursor-not-allowed" : ""
        }`}
      ></button>
    </Corners>
  );
};
