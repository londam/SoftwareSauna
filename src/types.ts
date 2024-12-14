export type CharMap = string[][];

export interface Result {
  letters: string;
  path: string;
}

export type Coord = { x: number; y: number };

export type Direction = "right" | "left" | "down" | "up";

export type Positions = {
  entryDir: Direction; //direction from where we entered
  pos: Coord; //coordinates of the position
  char: string; //character in the position
};

export type InputMap = CharMap | string;
