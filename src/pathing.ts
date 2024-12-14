import { directions, endChar, horizontal, startChar, straightDir, turn, vertical } from "./consts";
import { isLetter, isStart, isValidPathChar } from "./helpers";
import { CharMap, Coord, Direction, Position } from "./types";

//if map[x][y] doesn't exist, return " " -> useful for getting out of bounds of array when looking for possible next position
//returns character in current position
export const getChar = (map: CharMap, { x, y }: Coord): string => map[x]?.[y] ?? " ";

export const findStartPos = (map: CharMap): Coord => {
  for (let x = 0; x < map.length; x++)
    for (let y = 0; y < map.length; y++) if (isStart(map[x][y])) return { x, y }; //like here!

  throw new Error("Starting character not found!");
};

export const getNextPosition = (
  currentPos: Position,
  map: CharMap,
  letters: string[],
  visitedLetterCoords: Set<string>
): Position => {
  //--------MOVEMENT-RULES-2/2----------------
  // on "x" -> you stop! (done is parent function)
  // on letter -> check if not visited before (add to list), then move: you try straight, if you can't you try turning
  // on "+", you always turn
  // on "@" -> you try all dirs
  // on "-" or "|" you conitnue straight, playing that you move underground until you land on a valid char. You can't turn on those chars

  let possiblePoss: Position[] = [];

  switch (currentPos.char) {
    case endChar: {
    }
    case startChar: {
      Object.values(straightDir).forEach((dir) => {
        checkAndAddToPossiblePoss(possiblePoss, map, currentPos.pos, dir);
      });
      // checkStraightPossible(possiblePoss, map, currentPos);
      // checkTurnPossible(possiblePoss, map, currentPos);
      // currentPos.entryDir = straightDir[currentPos.entryDir];
      // checkStraightPossible(possiblePoss, map, currentPos);
      break;
    }
    case horizontal: {
      //query Next move, first straight then turning to each side
      checkStraightPossible(possiblePoss, map, currentPos);
      break;
    }
    case vertical: {
      //query Next move, first straight then turning to each side
      checkStraightPossible(possiblePoss, map, currentPos);
      break;
    }
    case turn: {
      checkTurnPossible(possiblePoss, map, currentPos);
      break;
    }
    default:
      if (isLetter(currentPos.char)) {
        // ...that's not visited before add to letters
        let xy = `${currentPos.pos.x},${currentPos.pos.y}`;
        if (!visitedLetterCoords.has(xy)) {
          letters.push(currentPos.char);
          visitedLetterCoords.add(xy);
        }

        //query Next move, first straight then turning to each side
        checkStraightPossible(possiblePoss, map, currentPos);
        checkTurnPossible(possiblePoss, map, currentPos);
      }
      break;
  }

  checkNextPosCount(possiblePoss);

  return possiblePoss[0];
};

export const nextPosition = (pos: Coord, dPos: Coord): Coord => {
  return { x: pos.x + dPos.x, y: pos.y + dPos.y };
};

export const checkNextPosCount = (possiblePoss: Position[]): void => {
  if (possiblePoss.length > 1)
    throw new Error("Too many possible directions - a fork in the road!");
  if (possiblePoss.length === 0) throw new Error("Zero possible directions - broken path!");
};

export const getTurnPathDirs = (entryDir: Direction): Direction[] => {
  if (entryDir === "left" || entryDir === "right") return ["up", "down"];
  if (entryDir === "up" || entryDir === "down") return ["left", "right"];
  throw new Error("Invalid input when finding turning path");
};

export function checkStraightPossible(arr: Position[], map: CharMap, currentPos: Position): void {
  checkAndAddToPossiblePoss(arr, map, currentPos.pos, straightDir[currentPos.entryDir]);
}

export function checkTurnPossible(arr: Position[], map: CharMap, currentPos: Position): void {
  const turnDirs: Direction[] = getTurnPathDirs(currentPos.entryDir);
  turnDirs.forEach((turnDir) => {
    checkAndAddToPossiblePoss(arr, map, currentPos.pos, straightDir[turnDir]);
  });
}

export function checkAndAddToPossiblePoss(
  arr: Position[],
  map: CharMap,
  currPos: Coord,
  dir: Direction
) {
  let nextPos: Coord = nextPosition(currPos, directions[dir]);
  let nextChar: string = getChar(map, nextPos);
  if (isValidPathChar(nextChar))
    arr.push({ pos: nextPos, char: nextChar, entryDir: straightDir[dir] });
}
