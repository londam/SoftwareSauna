import checkStartEnd from "./checkStartEnd";
import { tests } from "./tests/mocks";

export type CharMap = string[][];

interface Result {
  letters: string;
  path: string;
}

type Coord = { x: number; y: number };
type Direction = "right" | "left" | "down" | "up";
type Positions = {
  entryDir: Direction; //direction from where we entered
  pos: Coord; //coordinates of the position
  char: string; //character in the position
};

export type InputMap = CharMap | string;

export const startChar = "@";
export const endChar = "x";
const horizontal = "-";
const vertical = "|";
const turn = "+";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const isLetter = (char: string) => /^[A-Z]$/.test(char);
const dirChars = [horizontal, vertical, turn];
const validPathChar = new Set([startChar, endChar, ...dirChars, ...letters]);
const isValidPathChar = (char: string) => validPathChar.has(char);
const isStart = (char: string) => char === startChar;
const isEnd = (char: string) => char === endChar;
const directions: Record<Direction, Coord> = {
  left: { x: 0, y: -1 },
  right: { x: 0, y: 1 },
  up: { x: -1, y: 0 },
  down: { x: 1, y: 0 },
};

const straightDir: Record<Direction, Direction> = {
  left: "right",
  right: "left",
  up: "down",
  down: "up",
};

const nextPosition = (pos: Coord, dPos: Coord): Coord => {
  return { x: pos.x + dPos.x, y: pos.y + dPos.y };
};

//if map[x][y] doesn't exist, return " " -> useful for getting out of bounds of array when looking for possible next position
const getChar = (map: CharMap, { x, y }: Coord): string => map[x]?.[y] ?? " "; //returns character in current position

export const findStartPos = (map: CharMap): Coord => {
  for (let x = 0; x < map.length; x++)
    for (let y = 0; y < map.length; y++) if (isStart(map[x][y])) return { x, y }; //like here!

  throw new Error("Starting character not found!");
};

function followPath(input: InputMap): Result {
  // easily check for edge cases of no or multiple start/end chars to save time
  checkStartEnd(input);

  // if input is multiline string, convert it to nested array
  const map: CharMap =
    typeof input === "string" ? input.split("\n").map((line) => line.split("")) : input;

  //now we have array, we check where start char is
  const startPos: Coord = findStartPos(map);

  //initializing for while loop:
  let currentPos: Positions = { char: startChar, pos: startPos, entryDir: "left" };
  let letters = "";
  let path = "";
  let visitedLetterCoords = new Set<string>();

  while (true) {
    let possiblePoss: Positions[] = [];

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
        checkNextPosCount(possiblePoss);
      }
      case horizontal: {
        //query Next move, first straight then turning to each side
        checkStraightPossible(possiblePoss, map, currentPos);
        checkNextPosCount(possiblePoss);
      }
      case vertical: {
        //query Next move, first straight then turning to each side
        checkStraightPossible(possiblePoss, map, currentPos);
        checkNextPosCount(possiblePoss);
      }
      case turn: {
        checkTurnPossible(possiblePoss, map, currentPos);
        checkNextPosCount(possiblePoss);
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
    }
    currentPos = possiblePoss[0];
  }
}

const checkNextPosCount = (possiblePoss: Positions[]): void => {
  if (possiblePoss.length > 1)
    throw new Error("Too many possible directions - a fork in the road!");
  if (possiblePoss.length === 0) throw new Error("Zero possible directions - broken path!");
};

const getTurnPathDirs = (entryDir: Direction): Direction[] => {
  if (entryDir === "left" || entryDir === "right") return ["up", "down"];
  if (entryDir === "up" || entryDir === "down") return ["left", "right"];
  throw new Error("Invalid input when finding turning path");
};

function checkStraightPossible(arr: Positions[], map: CharMap, currentPos: Positions): void {
  let nextPos = nextPosition(currentPos.pos, directions[straightDir[currentPos.entryDir]]);
  let nextChar = getChar(map, nextPos);
  if (isValidPathChar(nextChar))
    arr.push({ pos: nextPos, char: nextChar, entryDir: currentPos.entryDir }); //entryDir: direction doesn't change if we go straight!
}

function checkTurnPossible(arr: Positions[], map: CharMap, currentPos: Positions): void {
  const turnDirs: Direction[] = getTurnPathDirs(currentPos.entryDir);
  turnDirs.forEach((turnDir) => {
    let nextPos = nextPosition(currentPos.pos, directions[turnDir]);
    let nextChar = getChar(map, nextPos);
    if (isValidPathChar(nextChar))
      arr.push({ pos: nextPos, char: nextChar, entryDir: straightDir[turnDir] }); //entryDir: if we turn DOWN on this position, on the next, it's entryDir will be from UP
  });
}

let inputMap = `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`;
console.log(followPath(inputMap));
