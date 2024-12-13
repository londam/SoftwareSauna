import { endChar, InputMap, startChar } from "./index";

export default function checkStartEnd(input: InputMap): Boolean {
  function check(input: string) {
    let startN = 0;
    let endN = 0;
    for (const char of input) {
      startN = char === startChar ? startN + 1 : startN;
      endN = char === endChar ? endN + 1 : endN;
    }
    if (!(startN === 1 && endN === 1)) {
      throw new Error("Too many or too few starting or ending characters found.");
    }
    return true; //for tests purposes
  }

  console.log("first");

  if (typeof input === "string") {
    return check(input);
  } else if (Array.isArray(input)) {
    return check(JSON.stringify(input));
  } else throw new Error("Input data format not array or string.");
}
