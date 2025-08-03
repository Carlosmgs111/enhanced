import { atom } from "nanostores";

export const matrix = atom<{ cols: number; rows: number; matrix: number[] }>({
  cols: 11,
  rows: 17,
  matrix: Array(11 * 17).fill(0),
});
export const matrixIsLocked = atom<boolean>(false);
export const dragMode = atom<"toggle" | "activate" | "deactivate">("toggle");
