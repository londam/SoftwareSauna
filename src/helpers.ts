import { InputMap, CharMap } from "./index";
import { tests } from "./tests/mocks";

function str2Arr(input: InputMap): CharMap {
  // if input is multiline string, convert it to nested array
  const map: CharMap =
    typeof input === "string" ? input.split("\n").map((line) => line.split("")) : input;

  return map;
}

export function turnTestsFromStrToArray(testString: Object) {
  Object.values(testString).forEach((testCase) => {
    testCase.forEach((testMap: InputMap) => {
      console.log(JSON.stringify(str2Arr(testMap)));
    });
  });
}
