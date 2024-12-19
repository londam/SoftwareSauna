export type CharMap = string[][];
export type InputMap = CharMap | string;

export interface Result {
  letters: string;
  path: string;
}

export type Coord = { x: number; y: number };

export type Direction = "right" | "left" | "down" | "up";

export type Position = {
  entryDir: Direction;
  pos: Coord;
  char: string;
};
