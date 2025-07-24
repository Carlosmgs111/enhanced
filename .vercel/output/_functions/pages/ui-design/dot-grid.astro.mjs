/* empty css                                              */
import { c as createComponent, r as renderComponent, b as renderScript, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BxFtCGAt.mjs';
import { $ as $$Layout } from '../../chunks/Layout_Dmv-XmFs.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
export { renderers } from '../../renderers.mjs';

const ControlPanel = ({
  panelActionLabel,
  setPanelActionLabel,
  dragMode,
  setDragMode,
  activateAll,
  deactivateAll,
  toggleModeLabels,
  downloadMatrix
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 border-l border-gray-400 h-fit relative", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        className: [
          "absolute -top-2 text-xs -rotate-90 top-1/2 -left-6 w-0 h-0 flex flex-col items-center whitespace-nowrap text-md transition-all duration-300 ease-in-out",
          panelActionLabel?.content ? panelActionLabel.color : "transparent"
        ].join(" "),
        children: panelActionLabel?.content
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: " flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setDragMode("toggle"),
          onMouseEnter: () => setPanelActionLabel({
            content: "Alterna el estado de cada celda",
            color: "text-yellow-500"
          }),
          onMouseLeave: () => setPanelActionLabel(null),
          className: `p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${dragMode === "toggle" ? "bg-gray-600 text-yellow-500 " : "text-gray-600 hover:bg-gray-200"}`,
          children: "◩"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setDragMode("activate"),
          onMouseEnter: () => setPanelActionLabel({
            content: "Siempre activa las celdas (pintar)",
            color: "text-green-500"
          }),
          onMouseLeave: () => setPanelActionLabel(null),
          className: `p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${dragMode === "activate" ? "bg-gray-600 text-green-500 " : "text-gray-600 hover:bg-gray-200"}`,
          children: "▣"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setDragMode("deactivate"),
          onMouseEnter: () => setPanelActionLabel({
            content: "Siempre desactiva las celdas (borrar)",
            color: "text-red-500"
          }),
          onMouseLeave: () => setPanelActionLabel(null),
          className: `p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8 ${dragMode === "deactivate" ? "bg-gray-600 text-red-500 " : "text-gray-600 hover:bg-gray-200"}`,
          children: "☐"
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: [
            "absolute -bottom-2 text-xs rotate-90 top-1/2 -right-6 w-0 h-0 flex flex-col items-center whitespace-nowrap text-md",
            dragMode === "toggle" ? "text-yellow-500 " : dragMode === "activate" ? "text-green-500 " : "text-red-500 "
          ].join(" "),
          children: toggleModeLabels[dragMode]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: " flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: activateAll,
          onMouseEnter: () => setPanelActionLabel({
            content: "Seleccionar todas las celdas",
            color: "text-green-500"
          }),
          onMouseLeave: () => setPanelActionLabel(null),
          className: `p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8`,
          children: "☑"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: deactivateAll,
          onMouseEnter: () => setPanelActionLabel({
            content: "Limpiar todas las celdas",
            color: "text-red-500"
          }),
          onMouseLeave: () => setPanelActionLabel(null),
          className: `p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8`,
          children: "☒"
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: [
            "absolute  text-xs rotate-90 top-1/2 -right-6 w-0 h-0 flex flex-col items-center whitespace-nowrap text-md transition-all duration-200 ease-in-out"
          ].join(" ")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: " flex flex-col gap-2 items-center border-r border-gray-400 h-fit px-2 relative", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: downloadMatrix,
          onMouseEnter: () => setPanelActionLabel({
            content: "Descargar como archivo",
            color: "text-orange-500"
          }),
          onMouseLeave: () => setPanelActionLabel(null),
          className: `p-1 text-md font-medium transition-all cursor-pointer aspect-square w-8 h-8`,
          children: "▼"
        }
      ),
      /* @__PURE__ */ jsx(
        "span",
        {
          className: [
            "absolute text-green-500 text-xs top-1/4 -right-2 w-0 h-0 items-center whitespace-nowrap text-md transition-all duration-200 ease-in-out"
          ].join(" "),
          children: "¡Descarga exitosa!"
        }
      )
    ] })
  ] });
};

const matrix = atom([[]]);

const useMatrixPanel = () => {
  const [rows, setRows] = useState(17);
  const [cols, setCols] = useState(11);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState("toggle");
  const [panelActionLabel, setPanelActionLabel] = useState(null);
  useStore(matrix);
  const createMatrix = useCallback((r, c, fill = 0) => {
    return Array(r).fill(null).map(() => Array(c).fill(fill));
  }, []);
  const updateDimensions = useCallback(() => {
    const newMatrix = createMatrix(rows, cols, 0);
    const currentMatrix = matrix.get();
    const currentRows = currentMatrix.length;
    const currentCols = currentMatrix[0]?.length || 0;
    const rowDifference = rows - currentRows;
    if (rowDifference >= 0) {
      const rowOffset = rowDifference;
      for (let i = 0; i < currentRows; i++) {
        for (let j = 0; j < Math.min(cols, currentCols); j++) {
          if (currentMatrix[i] && currentMatrix[i][j] !== void 0) {
            const newRowIndex = i + rowOffset;
            if (newRowIndex < rows) {
              newMatrix[newRowIndex][j] = currentMatrix[i][j];
            }
          }
        }
      }
    } else {
      const startFromRow = Math.abs(rowDifference);
      for (let i = startFromRow; i < currentRows; i++) {
        for (let j = 0; j < Math.min(cols, currentCols); j++) {
          if (currentMatrix[i] && currentMatrix[i][j] !== void 0) {
            const newRowIndex = i - startFromRow;
            newMatrix[newRowIndex][j] = currentMatrix[i][j];
          }
        }
      }
    }
    matrix.set(newMatrix);
  }, [rows, cols, matrix.get(), createMatrix]);
  const getCursorClass = useCallback(() => {
    const draggingModes = {
      toggle: "cursor-crosshair",
      activate: "cursor-copy",
      deactivate: "cursor-not-allowed"
    };
    if (isDragging) {
      return draggingModes[dragMode] || "cursor-default";
    }
    return "cursor-pointer";
  }, [isDragging, dragMode]);
  const toggleCell = useCallback(
    (i, j, forceValue = null) => {
      const currentMatrix = matrix.get();
      const newMatrix = currentMatrix.map((row) => [...row]);
      if (forceValue !== null) {
        newMatrix[i][j] = forceValue;
      } else {
        newMatrix[i][j] = newMatrix[i][j] === 0 ? 1 : 0;
      }
      matrix.set(newMatrix);
    },
    [isDragging]
  );
  const handleMouseDown = useCallback(
    (i, j) => {
      setIsDragging(true);
      const dragModes = {
        toggle: () => toggleCell(i, j),
        activate: () => toggleCell(i, j, 1),
        deactivate: () => toggleCell(i, j, 0)
      };
      dragModes[dragMode]();
    },
    [toggleCell, dragMode]
  );
  const handleMouseEnter = useCallback(
    (i, j) => {
      if (isDragging) {
        const dragModes = {
          toggle: () => toggleCell(i, j),
          activate: () => toggleCell(i, j, 1),
          deactivate: () => toggleCell(i, j, 0)
        };
        dragModes[dragMode]();
      }
    },
    [isDragging, toggleCell, dragMode]
  );
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    },
    [isDragging]
  );
  const activateAll = useCallback(() => {
    const currentMatrix = matrix.get();
    const newMatrix = currentMatrix.map((row) => row.map(() => 1));
    matrix.set(newMatrix);
  }, []);
  const deactivateAll = useCallback(() => {
    const currentMatrix = matrix.get();
    const newMatrix = currentMatrix.map((row) => row.map(() => 0));
    matrix.set(newMatrix);
  }, []);
  const downloadMatrix = useCallback(async () => {
    const matrixData = matrix.get();
    const defaultFileName = "matrix.json";
    const jsonBlob = new Blob([JSON.stringify(matrixData, null, 2)], {
      type: "application/json"
    });
    try {
      if (!window?.showSaveFilePicker) {
        alert(
          "Tu navegador no soporta la descarga avanzada. Usa Chrome o Edge."
        );
        return;
      }
      const fileHandle = await window?.showSaveFilePicker({
        suggestedName: defaultFileName,
        types: [
          {
            description: "Archivo JSON",
            accept: { "application/json": [".json"] }
          }
        ]
      });
      const writable = await fileHandle.createWritable();
      await writable.write(jsonBlob);
      await writable.close();
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error al guardar el archivo:", err);
      }
    }
  }, []);
  useEffect(() => {
    updateDimensions();
  }, [rows, cols]);
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);
  const toggleModeLabels = {
    toggle: "Intercambia",
    activate: "Activa",
    deactivate: "Desactiva"
  };
  return {
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
    createMatrix,
    updateDimensions,
    getCursorClass,
    toggleCell,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleMouseMove,
    activateAll,
    deactivateAll,
    toggleModeLabels,
    downloadMatrix
  };
};

const MatrixPanel = () => {
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
    downloadMatrix
  } = useMatrixPanel();
  return /* @__PURE__ */ jsxs("div", { className: "flex p-10 gap-8 ", children: [
    /* @__PURE__ */ jsxs("div", { className: "inline-block w-fit h-fit ", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `grid gap-[1px] mb-4 relative ${getCursorClass()}`,
          style: {
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            userSelect: "none"
            // ? Prevent text selection
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "w-[1px] h-full border-l-[1px] border-dashed border-gray-400 absolute -left-4 top-0 flex items-center", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute -top-2 -left-5 text-2xl font-thin text-gray-600",
                  onClick: () => {
                    setRows(rows + 1);
                  },
                  children: "↑"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: " transform -rotate-90 translate-x-[-24px] whitespace-nowrap w-0 h-0 flex flex-col items-center", children: [
                rows,
                " filas"
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "absolute -bottom-2 -left-5 text-2xl font-thin text-gray-600",
                  onClick: () => {
                    setRows(rows - 1);
                  },
                  children: "↓"
                }
              )
            ] }),
            matrix.get().map(
              (row, i) => row.map((cell, j) => /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: () => handleMouseDown(i, j),
                  onMouseEnter: () => handleMouseEnter(i, j),
                  onDragStart: (e) => e.preventDefault(),
                  className: `w-8 h-8 border-[1px] border-dotted border-gray-300 text-sm font-bold transition-all duration-200 hover:scale-110 ${cell === 1 ? "bg-gray-700 border-white" : "hover:bg-gray-50"} ${isDragging ? "select-none" : ""} ${getCursorClass()}`
                },
                `${i}-${j}`
              ))
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "w-full h-[1px] border-t-[1px] border-dashed border-gray-400 relative", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "absolute -top-2 left-0 text-3xl font-thin text-gray-600",
            onClick: () => {
              setCols(cols - 1);
            },
            children: "←"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: " text-center", children: [
          cols,
          " columnas"
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "absolute -top-2 right-0 text-3xl font-thin text-gray-600",
            onClick: () => {
              setCols(cols + 1);
            },
            children: "→"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ControlPanel,
      {
        ...{
          panelActionLabel,
          setPanelActionLabel,
          dragMode,
          setDragMode,
          activateAll,
          deactivateAll,
          toggleModeLabels,
          downloadMatrix
        }
      }
    )
  ] });
};

const $$DotGrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container flex flex-col items-center justify-center"> <header class="header"> <h1>Dotted Font</h1> <p>Fuente Original Inspirada en Matriz de Puntos</p> <p>
Diseñada especialmente para pantallas digitales y señalización moderna
</p> </header> <div class="demo-section"> <div id="array-generator"> <h1>Generador de matriz</h1> ${renderComponent($$result2, "MatrixPanel", MatrixPanel, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Documentos/Desktop/enhanced/app/src/components/MatrixPanel", "client:component-export": "MatrixPanel" })} </div> <div id="character"></div> <div class="bg-lime-500 p-8 inline-block flex gap-4" id="svg-container"> <div id="svg-a"></div> <div id="svg-b"></div> <div id="svg-c"></div> </div> </div> </div> ` })} ${renderScript($$result, "D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid.astro", void 0);

const $$file = "D:/Documentos/Desktop/enhanced/app/src/pages/UI-design/dot-grid.astro";
const $$url = "/UI-design/dot-grid";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$DotGrid,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
