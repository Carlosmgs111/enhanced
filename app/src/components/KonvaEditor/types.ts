import { Image as KonvaImage } from "react-konva";
import React from "react";

export type ElementType = "rect" | "text" | "image";

export interface ElementBase {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  layer: string;
  draggable?: boolean;
}

export interface ImageElement extends ElementBase {
  type: "image";
  width: number;
  height: number;
  image: string;
}

export interface RectElement extends ElementBase {
  type: "rect";
  width: number;
  height: number;
  fill: string;
}

export interface TextElement extends ElementBase {
  type: "text";
  text: string;
  fontSize: number;
  fill: string;
}

export type EditorElement = RectElement | TextElement | ImageElement;
