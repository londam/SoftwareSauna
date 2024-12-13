import checkStartEnd from "./checkStartEnd";
import { tests } from "./tests/mocks";

export type Map = string[][];

interface Result {
  letters: string;
  path: string;
}
export const startChar = "@";
export const endChar = "x";

export type InputMap = Map | string;

function followPath(input: InputMap): Result {
  // easily check for edge cases of no or multiple start/end if input is string to save time
  checkStartEnd(input);

  // if input is multiline string, convert it to nested array
  const map: Map =
    typeof input === "string" ? input.split("\n").map((line) => line.split("")) : input;

  //  return { letters, path };
  return { letters: "letters", path: "path" };
}
