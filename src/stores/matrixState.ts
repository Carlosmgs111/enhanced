import { atom } from "nanostores";

export const matrix = atom<number[][]>([[]]);
export const matrixIsLocked = atom<boolean>(false);
export const dragMode = atom<"toggle" | "activate" | "deactivate">("toggle");
