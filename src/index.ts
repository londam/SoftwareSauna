import checkStartEnd from "./checkStartEnd";
import { endChar, startChar } from "./consts";
import { input2map, isValidPathChar } from "./helpers";
import { findStartPos, getNextPosition } from "./pathing";
import { CharMap, Coord, InputMap, Position, Result } from "./types";

export function followPath(input: InputMap): Result {
  // easily check for edge cases of no or multiple start/end chars to save time
  checkStartEnd(input);

  const map: CharMap = input2map(input);

  const startPos: Coord = findStartPos(map);

  //initializing for while loop:
  let currentPos: Position = { char: startChar, pos: startPos, entryDir: "left" };
  const letters: string[] = [];
  let path = "";
  const visitedLetterCoords = new Set<string>();

  while (true) {
    // Maybe this can go outside of the loop since we check for the next char?
    // -> we can't. when we check for next char, we ignore invalid chars (and spaces), and here once we move here we yell about it!
    if (!isValidPathChar(currentPos.char))
      throw new Error(`Invalid map: contains invalid character '${currentPos.char}'`);

    // add to path since we validated it's OK char above
    path += currentPos.char;

    //--------MOVEMENT-RULES-1/2----------------
    // on "x" -> you stop!
    if (currentPos.char === endChar) return { letters: letters.join(""), path };

    currentPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);
  }
}
