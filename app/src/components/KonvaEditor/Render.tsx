import type { EditorElement } from "./types";
import { Rect } from "react-konva";
import type { RectElement } from "./types";
import { useState, type RefObject } from "react";
import { Text } from "react-konva";
import type { TextElement } from "./types";
import { Image as KonvaImage } from "react-konva";
import type { ImageElement } from "./types";
import { useEffect } from "react";

function calculateAspectRatio(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  const aspectRatio = originalWidth / originalHeight;

  let newWidth = maxWidth;
  let newHeight = maxWidth / aspectRatio;

  // Si la altura calculada excede el máximo, ajustar por altura
  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = maxHeight * aspectRatio;
  }

  return { width: newWidth, height: newHeight };
}

const renderType: Record<
  string,
  (
    element: EditorElement,
    elementRefs: RefObject<any>,
    selected: EditorElement | null,
    trRef: RefObject<any>,
    dragProps: any,
    imageCache: Record<string, HTMLImageElement | null>
  ) => React.ReactNode
> = {
  rect: (
    element: EditorElement,
    elementRefs: RefObject<any>,
    selected: EditorElement | null,
    trRef: RefObject<any>,
    dragProps: any
  ) => {
    const r = element as RectElement;
    return (
      <Rect
        ref={(node) => {
          elementRefs.current[r.id] = node;
          if (selected?.id === r.id && node && trRef.current) {
            trRef.current.nodes([node]);
          }
        }}
        key={r.id}
        x={r.x}
        y={r.y}
        width={r.width}
        height={r.height}
        fill={r.fill}
        {...dragProps}
      />
    );
  },
  text: (
    element: EditorElement,
    elementRefs: RefObject<any>,
    selected: EditorElement | null,
    trRef: RefObject<any>,
    dragProps: any
  ) => {
    const t = element as TextElement;
    return (
      <Text
        ref={(node) => {
          elementRefs.current[t.id] = node;
          if (selected?.id === t.id && node && trRef.current) {
            trRef.current.nodes([node]);
          }
        }}
        key={t.id}
        x={t.x}
        y={t.y}
        text={t.text}
        fontSize={t.fontSize}
        fill={t.fill}
        {...dragProps}
      />
    );
  },
  image: (
    element: EditorElement,
    elementRefs: RefObject<any>,
    selected: EditorElement | null,
    trRef: RefObject<any>,
    dragProps: any,
    imageCache: Record<string, HTMLImageElement | null>
  ) => {
    const i = element as ImageElement;
    const cachedImg = imageCache[i.id];
    if (!cachedImg) return null;
    const originalWidth = cachedImg.width;
    const originalHeight = cachedImg.height;
    const maxWidth = 400;
    const maxHeight = 280;
    const { width, height } = calculateAspectRatio(
      originalWidth,
      originalHeight,
      maxWidth,
      maxHeight
    );
    return (
      <KonvaImage
        ref={(node) => {
          elementRefs.current[i.id] = node;
          if (selected?.id === i.id && node && trRef.current) {
            trRef.current.nodes([node]);
          }
        }}
        key={i.id}
        x={i.x}
        y={i.y}
        width={width}
        height={height}
        image={imageCache[i.id]}
        {...dragProps}
      />
    );
  },
};

export const Render = ({
  element,
  elementRefs,
  selected,
  trRef,
  dragProps,
  layerElements,
}: {
  element: EditorElement;
  elementRefs: RefObject<any>;
  selected: EditorElement | null;
  trRef: RefObject<any>;
  dragProps: any;
  layerElements: EditorElement[];
}) => {
  const [imageCache, setImageCache] = useState<
    Record<string, HTMLImageElement | null>
  >({});

   useEffect(() => {
      // Identificamos los IDs que necesitamos cargar
      const imageIds = layerElements
        .filter((el) => el.type === "image")
        .map((el) => (el as ImageElement).id);
  
      imageIds.forEach((id) => {
        if (imageCache[id]) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        const el = layerElements.find((e) => e.id === id) as ImageElement;
        img.src = el.image;
        img.onload = () =>
          setImageCache((prev) => ({
            ...prev,
            [id]: img,
          }));
      });
      layerElements.forEach((el) => {
        elementRefs.current[el.id] = null;
      });
    }, [layerElements]);

  return renderType[element.type](
    element,
    elementRefs,
    selected,
    trRef,
    dragProps,
    imageCache
  );
};
