import React from "react";

interface Props {
  layers: string[];
  visibility: Record<string, boolean>;
  onToggleLayer: (layer: string) => void;
  onAddLayer: () => void;
  onAddRect: () => void;
  onAddText: () => void;
  onLoadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
}

export const Toolbar = ({
  layers,
  visibility,
  onToggleLayer,
  onAddLayer,
  onAddRect,
  onAddText,
  onLoadFile,
  onExport,
}: Props) => (
  <div className="flex flex-col gap-2 p-4 border-r border-gray-200 h-full">
    <div className="flex flex-col gap-2">
      {/* <button className=" w-full text-left hover:bg-gray-200" onClick={onAddRect}>
        + Rectángulo
      </button>
      <button className=" w-full text-left hover:bg-gray-200" onClick={onAddText}>
        + Texto
      </button> */}
      <div className="w-full text-left hover:bg-gray-200 px-2 py-1">
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={onLoadFile}
          className="hidden"
        />
        <label htmlFor="file">Cargar Imagen</label>
      </div>
    </div>
    <hr />
    <div className="flex flex-col gap-2">
      {layers.map((layer) => (
        <label className={["hover:bg-gray-200 px-2 py-1", visibility[layer] ? "bg-gray-300" : ""].join(" ")} key={layer}>
          <input
            className="hidden"
            type="checkbox"
            checked={visibility[layer]}
            onChange={() => onToggleLayer(layer)}
          />
          {layer}
        </label>
      ))}
    </div>
    <button
      onClick={onAddLayer}
      className=" w-full text-left hover:bg-gray-200 px-2 py-1"
    >
      Nueva capa
    </button>
    <hr />
    <button onClick={onExport} className=" w-full text-left hover:bg-gray-200 px-2 py-1">
      Exportar
    </button>
  </div>
);
