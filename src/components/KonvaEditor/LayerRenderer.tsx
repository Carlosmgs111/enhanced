import {
  Layer,
  Transformer,
} from "react-konva";
import { useEffect, useRef } from "react";
import { Render } from "./Render";

import type {
  EditorElement,
} from "./types";

interface Props {
  elements: EditorElement[];
  layer: string;
  visible: boolean;
  onDragEnd: (id: string, pos: { x: number; y: number }) => void;
  onSelect: (el: EditorElement) => void;
  selected: EditorElement | null;
}

export const LayerRenderer = ({
  elements,
  layer,
  visible,
  onDragEnd,
  onSelect,
  selected,
}: Props) => {
  if (!visible) return null;
  const layerElements = elements.filter((el) => el.layer === layer);
  const trRef = useRef<any>(null);
  const elementRefs = useRef<Record<string, any>>({});
  const layerRef = useRef<any>(null);

  useEffect(() => {
    if (selected) {
      let node = null;
      node = elementRefs.current[selected.id];
      if (node && trRef.current) {
        trRef.current.nodes([node]);
      }
    }
    if (!selected) {
      trRef.current.nodes([]);
    }
  }, [selected]);

  useEffect(() => {
    if (layerRef.current) {
      // layerRef.current.moveToBottom();
      layerRef.current;
    }
  }, [layerRef]);

  return (
    <Layer ref={layerRef}>
      {layerElements.map((el) => {
        return (
          <Render
            key={el.id}
            element={el}
            elementRefs={elementRefs}
            selected={selected}
            trRef={trRef}
            layerElements={layerElements}
            dragProps={{
              draggable: el.draggable ?? true,
              onDragStart: () => {
                onSelect(el);
              },
              onDragEnd: (e: any) =>
                onDragEnd(el.id, { x: e.target.x(), y: e.target.y() }),
              onClick: () => onSelect(el),
            }}
          />
        );
      })}
      <Transformer ref={trRef} />
    </Layer>
  );
};


