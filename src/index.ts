import checkStartEnd from "./checkStartEnd";
import { endChar, horizontal, startChar, straightDir, turn, vertical } from "./consts";
import { input2map, isLetter, isValidPathChar } from "./helpers";
import {
  checkNextPosCount,
  checkStraightPossible,
  checkTurnPossible,
  findStartPos,
  getNextPosition,
} from "./pathing";
import { CharMap, Coord, InputMap, Position, Result } from "./types";

function followPath(input: InputMap): Result {
  // easily check for edge cases of no or multiple start/end chars to save time
  checkStartEnd(input);

  // if input is multiline string, convert it to nested array
  const map: CharMap = input2map(input);

  //now we have array, we check where start char is
  const startPos: Coord = findStartPos(map);

  //initializing for while loop:
  let currentPos: Position = { char: startChar, pos: startPos, entryDir: "left" };
  const letters: string[] = [];
  let path = "";
  const visitedLetterCoords = new Set<string>();

  while (true) {
    //check if it's a valid map char, if not, stop and throw error!
    // Maybe this can go outside of the loop since we check for the next char?
    // -> we can't. when we check for next char, we ignore invalid chars (and spaces), and here once we move here we yell about it!
    if (!isValidPathChar(currentPos.char))
      throw new Error(`Invalid map: contains invalid character '${currentPos.char}'`);
    //if yes, continue:

    // add to path since we validated it's OK char above
    path += currentPos.char;

    //--------MOVEMENT-RULES-1/2----------------
    // on "x" -> you stop!
    if (currentPos.char === endChar) return { letters: letters.join(""), path };

    currentPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);
  }
}

let inputMap = `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`;

const inputMapA = [
  ["+", "-", "-", "-", "+", " "],
  ["|", " ", " ", " ", "|", " "],
  ["|", " ", "@", "A", "-", "+"],
  ["|", " ", " ", " ", "x", "|"],
  ["+", "-", "B", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " "],
];
// let output = followPath(inputMap);
let output = followPath(inputMapA);
console.log(output);
