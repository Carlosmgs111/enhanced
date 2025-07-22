export const ControlPanel = ({
  panelActionLabel,
  setPanelActionLabel,
  dragMode,
  setDragMode,
  activateAll,
  deactivateAll,
  toggleModeLabels,
  downloadMatrix,
}: {
  panelActionLabel: { content: string; color: string } | null;
  setPanelActionLabel: (label: { content: string; color: string } | null) => void;
  dragMode: "toggle" | "activate" | "deactivate";
  setDragMode: (mode: "toggle" | "activate" | "deactivate") => void;
  activateAll: () => void;
  deactivateAll: () => void;
  toggleModeLabels: {
    toggle: string;
    activate: string;
    deactivate: string;
  };
  downloadMatrix: () => void;
}) => {
  return (
    <div className="flex flex-col gap-4 border-l border-gray-400 h-fit relative">
      <span
        className={[
          "absolute -top-2 text-xs -rotate-90 top-1/2 -left-6 w-0 h-0 flex flex-col items-center whitespace-nowrap text-md transition-all duration-300 ease-in-out",
          panelActionLabel?.content ? panelActionLabel.color : "transparent",
        ].join(" ")}
      >
        {panelActionLabel?.content}
      </span>

      {/* // ? Drag mode selector */}
      <div className=" flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative">
        <button
          onClick={() => setDragMode("toggle")}
          onMouseEnter={() =>
            setPanelActionLabel({
              content: "Alterna el estado de cada celda",
              color: "text-yellow-500",
            })
          }
          onMouseLeave={() => setPanelActionLabel(null)}
          className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${
            dragMode === "toggle"
              ? "bg-gray-600 text-yellow-500 "
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          ◩
        </button>
        <button
          onClick={() => setDragMode("activate")}
          onMouseEnter={() =>
            setPanelActionLabel({
              content: "Siempre activa las celdas (pintar)",
              color: "text-green-500",
            })
          }
          onMouseLeave={() => setPanelActionLabel(null)}
          className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${
            dragMode === "activate"
              ? "bg-gray-600 text-green-500 "
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          ▣
        </button>
        <button
          onClick={() => setDragMode("deactivate")}
          onMouseEnter={() =>
            setPanelActionLabel({
              content: "Siempre desactiva las celdas (borrar)",
              color: "text-red-500",
            })
          }
          onMouseLeave={() => setPanelActionLabel(null)}
          className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${
            dragMode === "deactivate"
              ? "bg-gray-600 text-red-500 "
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          ☐
        </button>
        <span
          className={[
            "absolute -bottom-2 text-xs rotate-90 top-1/2 -right-6 w-0 h-0 flex flex-col items-center whitespace-nowrap text-md",
            dragMode === "toggle"
              ? "text-yellow-500 "
              : dragMode === "activate"
              ? "text-green-500 "
              : "text-red-500 ",
          ].join(" ")}
        >
          {toggleModeLabels[dragMode]}
        </span>
      </div>
      {/* // ? Bulk action selector */}
      <div className=" flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative">
        <button
          onClick={activateAll}
          onMouseEnter={() =>
            setPanelActionLabel({
              content: "Seleccionar todas las celdas",
              color: "text-green-500",
            })
          }
          onMouseLeave={() => setPanelActionLabel(null)}
          className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8`}
        >
          ☑
        </button>
        <button
          onClick={deactivateAll}
          onMouseEnter={() =>
            setPanelActionLabel({
              content: "Limpiar todas las celdas",
              color: "text-red-500",
            })
          }
          onMouseLeave={() => setPanelActionLabel(null)}
          className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8`}
        >
          ☒
        </button>
        <span
          className={[
            "absolute  text-xs rotate-90 top-1/2 -right-6 w-0 h-0 flex flex-col items-center whitespace-nowrap text-md transition-all duration-200 ease-in-out",
          ].join(" ")}
        ></span>
      </div>
      {/*  */}
      <div className=" flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative">
        <button
          onClick={downloadMatrix}
          onMouseEnter={() =>
            setPanelActionLabel({
              content: "Descargar como archivo",
              color: "text-orange-500",
            })
          }
          onMouseLeave={() => setPanelActionLabel(null)}
          className={`p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8`}
        >
          ▼
        </button>
        <span
          className={[
            "absolute text-green-500 text-xs top-1/4 -right-2 w-0 h-0 items-center whitespace-nowrap text-md transition-all duration-200 ease-in-out",
          ].join(" ")}
        >
          ¡Descarga exitosa!
        </span>
      </div>
    </div>
  );
};
