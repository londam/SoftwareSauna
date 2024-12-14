import { directions, startChar } from "../consts";
import {
  checkNextPosCount,
  checkStraightPossible,
  checkTurnPossible,
  findStartPos,
  getChar,
  getNextPosition,
  getTurnPathDirs,
  nextPosition,
} from "../pathing";
import { Position } from "../types";

const map = [
  ["+", "-", "-", "-", "+", " "],
  ["|", " ", " ", " ", "|", " "],
  ["|", " ", "@", "A", "-", "+"],
  ["|", " ", " ", " ", "x", "|"],
  ["+", "-", "B", "-", "-", "+"],
  [" ", " ", " ", " ", " ", " "],
];

describe("getChar", () => {
  it("should return the correct character for valid coordinates", () => {
    expect(getChar(map, { x: 2, y: 2 })).toBe("@");
    expect(getChar(map, { x: 3, y: 4 })).toBe("x");
  });

  it('should return " " for out-of-bounds coordinates', () => {
    expect(getChar(map, { x: 6, y: 7 })).toBe(" ");
    expect(getChar(map, { x: -1, y: 0 })).toBe(" ");
  });
});

describe("findStartPos", () => {
  it("should find the start position correctly", () => {
    expect(findStartPos(map)).toEqual({ x: 2, y: 2 });
  });

  it("should throw an error if start character is not found", () => {
    const invalidMap = [
      [" ", " ", " ", " ", " "],
      [" ", "A", "B", " ", " "],
      [" ", " ", " ", "x", " "],
    ];
    expect(() => findStartPos(invalidMap)).toThrow("Starting character not found!");
  });
});

describe("nextPosition", () => {
  it("should calculate the next position correctly", () => {
    expect(nextPosition({ x: 1, y: 1 }, directions.right)).toEqual({ x: 1, y: 2 });
    expect(nextPosition({ x: 1, y: 1 }, directions.down)).toEqual({ x: 2, y: 1 });
  });
  it("should handle out-of-bounds coordinates correctly", () => {
    expect(nextPosition({ x: -1, y: 0 }, directions.up)).toEqual({ x: -2, y: 0 });
    expect(nextPosition({ x: 0, y: -1 }, directions.left)).toEqual({ x: 0, y: -2 });
  });
  //also add for up/down and when out of bounds cases
});

describe("checkNextPosCount", () => {
  it("should throw an error if there are too many directions", () => {
    expect(() =>
      checkNextPosCount([
        { pos: { x: 1, y: 2 }, char: "@", entryDir: "right" },
        { pos: { x: 2, y: 1 }, char: "A", entryDir: "down" },
      ])
    ).toThrow("Too many possible directions - a fork in the road!");
  });

  it("should throw an error if there are no directions", () => {
    expect(() => checkNextPosCount([])).toThrow("Zero possible directions - broken path!");
  });
});

describe("getTurnPathDirs", () => {
  it("should return the correct directions for a given entry direction", () => {
    expect(getTurnPathDirs("left")).toEqual(["up", "down"]);
    expect(getTurnPathDirs("up")).toEqual(["left", "right"]);
  });
});

describe("checkStraightPossible", () => {
  it("should add valid straight directions to the array", () => {
    const arr: Position[] = [];
    const currentPos: Position = { pos: { x: 2, y: 2 }, char: "@", entryDir: "left" };
    checkStraightPossible(arr, map, currentPos);
    expect(arr.length).toBe(1);
    expect(arr[0].pos).toEqual({ x: 2, y: 3 });
    expect(arr[0].char).toBe("A");
  });

  it("should not add invalid directions", () => {
    const arr: Position[] = [];
    const currentPos: Position = { pos: { x: 5, y: 0 }, char: "@", entryDir: "left" };
    checkStraightPossible(arr, map, currentPos);
    expect(arr.length).toBe(0);
  });

  it('should continue straight if on "-" or "|", ignoring turns', () => {
    const arr: Position[] = [];
    const currentPos: Position = { pos: { x: 1, y: 4 }, char: "|", entryDir: "up" };
    checkStraightPossible(arr, map, currentPos);
    expect(arr.length).toBe(1);
    expect(arr[0].pos).toEqual({ x: 2, y: 4 }); // It should continue straight to the next valid character
    expect(arr[0].char).toEqual("-"); // It should continue straight to the next valid character
  });
  //TODO add more examples with other chars (-| and +)
});

describe("checkTurnPossible", () => {
  it("should add valid turn directions to the array", () => {
    const arr: Position[] = [];
    const currentPos: Position = { pos: { x: 2, y: 5 }, char: "+", entryDir: "left" };
    checkTurnPossible(arr, map, currentPos);
    expect(arr.length).toBe(1);
    expect(arr[0].pos).toEqual({ x: 3, y: 5 }); // It should continue straight to the next valid character
    expect(arr[0].char).toEqual("|"); // It should continue straight to the next valid character
  });

  //TODO add more examples with other chars (-| and +)
});

describe("getNextPosition", () => {
  const letters: string[] = [];
  const visitedLetterCoords = new Set<string>();
  it("should handle startChar positions", () => {
    const currentPos: Position = { pos: { x: 2, y: 2 }, char: startChar, entryDir: "left" };
    const nextPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);

    expect(nextPos).toEqual({ pos: { x: 2, y: 3 }, char: "A", entryDir: "left" }); // The next position after start should be straight
  });

  it('should move straight on "-" or "|" without turning', () => {
    const currentPos: Position = { pos: { x: 0, y: 4 }, char: "+", entryDir: "left" };
    const nextPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);

    expect(nextPos).toEqual({ pos: { x: 1, y: 4 }, char: "|", entryDir: "up" }); // Moving straight to the next valid position
  });

  it('should turn on "+"', () => {
    const currentPos: Position = { pos: { x: 0, y: 0 }, char: "+", entryDir: "right" };
    const nextPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);

    expect(nextPos).toEqual({ pos: { x: 1, y: 0 }, char: "|", entryDir: "up" }); // Should turn downwards, as we have '+' (turn)
  });

  it('should try all directions on "@"', () => {
    const currentPos: Position = { pos: { x: 2, y: 2 }, char: "@", entryDir: "right" };
    const nextPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);

    // Should explore all directions, likely picking the one that moves down to a valid path
    expect(nextPos).toEqual({ pos: { x: 2, y: 3 }, char: "A", entryDir: "left" }); // Continue downwards from '@' to ' ' (empty space)
  });

  it("should not save letter to list more than once", () => {
    const currentPos: Position = { pos: { x: 2, y: 3 }, char: "A", entryDir: "right" };

    // First visit
    let nextPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);
    expect(letters).toContain("A");
    expect(visitedLetterCoords.size).toBe(1);

    // Second visit should not add 'A' again
    nextPos = getNextPosition(nextPos, map, letters, visitedLetterCoords);
    expect(letters.length).toBe(1);
    expect(visitedLetterCoords.size).toBe(1); // Visited set should not increase
  });

  it('should handle movement to a valid position when continuing straight from "-" or "|"', () => {
    const currentPos: Position = { pos: { x: 1, y: 0 }, char: "|", entryDir: "up" };
    const nextPos = getNextPosition(currentPos, map, letters, visitedLetterCoords);

    expect(nextPos).toEqual({ pos: { x: 2, y: 0 }, char: "|", entryDir: "up" }); // Continue straight down
  });

  it("should throw an error if there are multiple valid directions possible", () => {
    const currentPos: Position = { pos: { x: 4, y: 2 }, char: "B", entryDir: "up" };
    expect(() => getNextPosition(currentPos, map, letters, visitedLetterCoords)).toThrow(
      "Too many possible directions - a fork in the road!"
    ); // No valid next position should return undefined
  });

  it("should throw an error if there are no possible next positions", () => {
    const currentPos: Position = { pos: { x: 3, y: 5 }, char: "|", entryDir: "left" }; // Edge case with no valid moves
    expect(() => getNextPosition(currentPos, map, letters, visitedLetterCoords)).toThrow(
      "Zero possible directions - broken path!"
    ); // No valid next position should return undefined
  });
});
