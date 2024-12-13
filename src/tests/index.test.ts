import { CharMap, findStartPos } from "../index";

import { tests } from "./mocks";

// Test Cases
describe("findStartPos function", () => {
  Object.values(tests.arrayValid).forEach((testTypes) => {
    testTypes.forEach((map) => {
      test("processes 2D array: %p", () => {
        expect(findStartPos(map)).toBeTruthy();
      });
    });
  });

  tests.arrayInvalid.missingStart.forEach((map) => {
    test("processes 2D array: %p", () => {
      console.log("___________________________________________________", map);
      expect(findStartPos(map)).toThrow("Starting character not found!");
    });
  });
});
