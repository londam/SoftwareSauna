import { Coord, Direction } from "./types";

export const startChar = "@";
export const endChar = "x";
export const horizontal = "-";
export const vertical = "|";
export const turn = "+";
export const validLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const dirChars = [horizontal, vertical, turn];
export const validPathChar = new Set([startChar, endChar, ...dirChars, ...validLetters]);

export const directions: Record<Direction, Coord> = {
  left: { x: 0, y: -1 },
  right: { x: 0, y: 1 },
  up: { x: -1, y: 0 },
  down: { x: 1, y: 0 },
};

export const straightDir: Record<Direction, Direction> = {
  left: "right",
  right: "left",
  up: "down",
  down: "up",
};
