import checkStartEnd from "./checkStartEnd";
import { tests } from "./tests/mocks";

export type Map = string[][];

interface Result {
  letters: string;
  path: string;
}

type Coord = [number, number];

export type InputMap = Map | string;

export const startChar = "@";
export const endChar = "x";
const validPathChar = new Set(["@", "x", "+", "|", "-", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]);
const isLetter = (char: string) => /^[A-Z]$/.test(char);
const isValidPathChar = (char: string) => validPathChar.has(char);
const isStart = (char: string) => char === startChar;
const isEnd = (char: string) => char === endChar;

const findStartPos = (map: Map): Coord => {
  //for sake of using the coords in right sequence, on purpose x is vertical and y is horizontal!
  for (let x = 0; x < map.length; x++)
    for (let y = 0; y < map.length; y++) if (isStart(map[x][y])) return [x, y]; //like here!

  throw new Error("Starting character not found!");
};

function followPath(input: InputMap): Result {
  // easily check for edge cases of no or multiple start/end if input is string to save time
  checkStartEnd(input);

  // if input is multiline string, convert it to nested array
  const map: Map =
    typeof input === "string" ? input.split("\n").map((line) => line.split("")) : input;

  //now we have array, we check where start char is
  const startPos: Coord = findStartPos(map);

  //  return { letters, path };
  return { letters: "letters", path: "path" };
}
