import checkStartEnd from "../src/checkStartEnd";
import { tests } from "./mocks";

// Test Cases
describe("checkStartEnd function", () => {
  test("input string with exactly one start and one end character should pass this test", () => {
    const validInput = "@--A---+ B-+ Cx";
    expect(checkStartEnd(validInput)).toBe(true);
  });

  test.each(tests.stringInvalid.multipleStarts)(
    "invalid string with multiple start characters should throw an error: %s",
    (input) => {
      expect(() => checkStartEnd(input)).toThrow(
        "Too many or too few starting or ending characters found."
      );
    }
  );

  Object.values(tests.stringValid).forEach((testCase) => {
    console.log("------------------------------------>>>", testCase);
    test.each(testCase)("string input with valid path should pass 1: %s", (input) => {
      expect(checkStartEnd(input)).toBe(true);
    });
  });

  test.each(tests.stringInvalid.multipleEnds)(
    "invalid string with multiple end characters should throw an error: %s",
    (input) => {
      expect(() => checkStartEnd(input)).toThrow(
        "Too many or too few starting or ending characters found."
      );
    }
  );
});