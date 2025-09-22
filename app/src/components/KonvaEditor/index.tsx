import React, { useState, useEffect } from "react";
import { Stage } from "react-konva";
import type { EditorElement } from "./types";
import { LayerRenderer } from "./LayerRenderer";
import { Toolbar } from "./Toolbar";
import { ElementForm } from "./ElementForm";
import { useRef } from "react";

const KonvaEditor = () => {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const stageRef = useRef<any>(null);
  const [layers, setLayers] = useState(["background", "foreground"]);
  const [visibility, setVisibility] = useState({
    background: true,
    foreground: true,
  });
  const [selected, setSelected] = useState<EditorElement | null>(null);

  const updateElement = (el: EditorElement) => {
    setElements((prev) => prev.map((e) => (e.id === el.id ? el : e)));
    setSelected(el);
  };

  const onDragEnd = (id: string, pos: { x: number; y: number }) => {
    setElements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...pos } : e))
    );
  };

  const toggleLayer = (layer: string) => {
    setVisibility((prev) => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof visibility],
    }));
  };

  const addLayer = () => {
    const name = prompt("Nombre de la nueva capa:");
    if (!name || layers.includes(name)) return;
    setLayers([...layers, name]);
    setVisibility((prev) => ({ ...prev, [name]: true }));
  };

  const addRect = () => {
    setElements((prev) => [
      ...prev,
      {
        id: `rect-${Date.now()}`,
        type: "rect",
        x: 100,
        y: 100,
        width: 120,
        height: 80,
        fill: "blue",
        layer: "foreground",
        draggable: true,
        resizable: true,
      },
    ]);
  };

  const addText = () => {
    setElements((prev) => [
      ...prev,
      {
        id: `text-${Date.now()}`,
        type: "text",
        x: 150,
        y: 150,
        text: "Nuevo texto",
        fontSize: 20,
        fill: "black",
        layer: "foreground",
        draggable: true,
      },
    ]);
  };

  const loadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageUrl = event.target?.result;
          setElements((prev) => [
            ...prev,
            {
              id: `image-${Date.now()}`,
              type: "image",
              x: 100,
              y: 100,
              width: 110,
              height: 110,
              image: imageUrl as string,
              layer: "foreground",
              draggable: true,
              resizable: true,
            },
          ]);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setElements((prev) => [
      ...prev,
      {
        id: "image-1",
        type: "image",
        x: 100,
        y: 100,
        width: 110,
        height: 110,
        image: "https://konvajs.org/img/icon.png",
        layer: "foreground",
        draggable: true,
        resizable: true,
      },
    ]);
  }, []);

  const exportImage = () => {
    setSelected(null);
    setTimeout(() => {
      if (stageRef?.current) {
        const dataURL = stageRef.current.toDataURL();
        if (!dataURL) return;
        console.log({ dataURL });
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "image.png";
        link.click();
      }
    }, 0);
  };

  const [width, height] = [550, 450];

  return (
    <div onMouseLeave={() => setSelected(null)} className="flex h-fit w-fit">
      <Toolbar
        layers={layers}
        visibility={visibility}
        onToggleLayer={toggleLayer}
        onAddLayer={addLayer}
        onAddRect={addRect}
        onAddText={addText}
        onLoadFile={loadFile}
        onExport={exportImage}
      />

      <div className={`bg-dotted-pattern bg-pattern w-[${width}px] h-[${height}px]`}>
        <Stage width={width} height={height} ref={stageRef}>
          {layers.map((layer) => (
            <LayerRenderer
              key={layer}
              elements={elements}
              layer={layer}
              visible={visibility[layer as keyof typeof visibility]}
              onDragEnd={onDragEnd}
              onSelect={setSelected}
              selected={selected}
            />
          ))}
        </Stage>
        <ElementForm selected={selected} onChange={updateElement} />
      </div>
    </div>
  );
};

export default KonvaEditor;
