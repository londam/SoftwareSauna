import { endChar, startChar, validPathChar } from "./consts";
import { tests } from "./tests/mocks";
import { CharMap, InputMap } from "./types";

export function input2map(input: InputMap): CharMap {
  // if input is multiline string, convert it to nested array
  const map: CharMap =
    typeof input === "string" ? input.split("\n").map((line) => line.split("")) : input;
  return map;
}

export function turnTestsFromStrToArray(testString: Object) {
  Object.values(testString).forEach((testCase) => {
    testCase.forEach((testMap: InputMap) => {
      console.log(JSON.stringify(input2map(testMap)));
    });
  });
}

export const isValidPathChar = (char: string) => validPathChar.has(char);
export const isStart = (char: string) => char === startChar;
export const isEnd = (char: string) => char === endChar;
export const isLetter = (char: string) => /^[A-Z]$/.test(char);
