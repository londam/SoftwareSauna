import checkStartEnd from "./checkStartEnd";
import { endChar, horizontal, startChar, straightDir, turn, vertical } from "./consts";
import { input2map, isLetter, isValidPathChar } from "./helpers";
import {
  checkNextPosCount,
  checkStraightPossible,
  checkTurnPossible,
  findStartPos,
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
  let letters = "";
  let path = "";
  let visitedLetterCoords = new Set<string>();

  while (true) {
    let possiblePoss: Position[] = [];

    //check if it's a valid map char, if not, stop and throw error!
    // Maybe this can go outside of the loop since we check for the next char?
    // -> we can't. when we check for next char, we ignore invalid chars (and spaces), and here once we move here we yell about it!
    if (!isValidPathChar(currentPos.char))
      throw new Error(`Invalid map: contains invalid character '${currentPos.char}'`);
    //if yes, continue:

    // add to path since we validated it's OK char above
    path += currentPos.char;

    //---------RULES--------------------------
    // on "x" -> you stop!
    // on letter -> check if not visited before (add to list), then move: you try straight, if you can't you try turning
    // on "+", you always turn
    // on "@" -> you try all dirs
    // on "-" or "|" you conitnue straight, playing that you move underground until you land on a valid char. You can't turn on those chars

    // if entryDir:
    //left  -> check curChar and go either straight (right) or up/down
    //right ->                -||-                  (left)      -||-
    //up    ->                -||-                  (down) or left/right
    //down  ->                -||-                  (up)        -||-

    switch (currentPos.char) {
      case endChar: {
        //end the voyage
        return { letters, path };
      }
      case startChar: {
        checkStraightPossible(possiblePoss, map, currentPos);
        checkTurnPossible(possiblePoss, map, currentPos);
        currentPos.entryDir = straightDir[currentPos.entryDir];
        checkStraightPossible(possiblePoss, map, currentPos);
        checkNextPosCount(possiblePoss);
        break;
      }
      case horizontal: {
        //query Next move, first straight then turning to each side
        checkStraightPossible(possiblePoss, map, currentPos);
        checkNextPosCount(possiblePoss);
        break;
      }
      case vertical: {
        //query Next move, first straight then turning to each side
        checkStraightPossible(possiblePoss, map, currentPos);
        checkNextPosCount(possiblePoss);
        break;
      }
      case turn: {
        checkTurnPossible(possiblePoss, map, currentPos);
        checkNextPosCount(possiblePoss);
        break;
      }
      default:
        if (isLetter(currentPos.char)) {
          // ...that's not visited before add to letters
          let xy = `${currentPos.pos.x},${currentPos.pos.y}`;
          if (!visitedLetterCoords.has(xy)) {
            letters += currentPos.char;
            visitedLetterCoords.add(xy);
          }

          //query Next move, first straight then turning to each side
          checkStraightPossible(possiblePoss, map, currentPos);
          checkTurnPossible(possiblePoss, map, currentPos);
          checkNextPosCount(possiblePoss);
        }
        break;
    }
    currentPos = possiblePoss[0];
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
let output = followPath(inputMap);
console.log(output);
