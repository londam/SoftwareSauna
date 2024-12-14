import { input2map, turnTestsFromStrToArray } from "../helpers";
import { CharMap } from "../types";

describe("input2map function", () => {
  it("should convert a multiline string into a CharMap", () => {
    const input: string = `
ABC
DEF
GHI`.trim(); // Mimic multiline string input

    const expectedOutput: CharMap = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];

    const result = input2map(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should return the same CharMap if the input is already a CharMap", () => {
    const input: CharMap = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];

    const result = input2map(input);
    expect(result).toBe(input); // Ensure the same reference is returned
  });

  it("should handle an empty string correctly", () => {
    const input: string = "";

    const expectedOutput: CharMap = [[]]; // Empty line becomes an array with an empty string

    const result = input2map(input);

    expect(result).toEqual(expectedOutput);
  });

  it("should handle an empty array (CharMap)", () => {
    const input: CharMap = [];

    const result = input2map(input);
    expect(result).toEqual(input); // Should return the same empty array
  });

  it("should handle a single-line string", () => {
    const input: string = "ABC";

    const expectedOutput: CharMap = [["A", "B", "C"]];

    const result = input2map(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle a string with multiple empty lines", () => {
    const input: string = `

ABC

DEF
`.trim();

    const expectedOutput: CharMap = [["A", "B", "C"], [], ["D", "E", "F"]];

    const result = input2map(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe("turnTestsFromStrToArray function (using console.log() anywhere when doing this tests will fail them)", () => {
  // Mock console.log
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  afterEach(() => {
    jest.clearAllMocks(); // Clear the mock after each test
  });

  afterAll(() => {
    jest.restoreAllMocks(); // Restore the original console.log
  });

  it("should process each map and log the result", () => {
    // Mock data
    const testString = {
      case1: [
        "@--A---+\n       |\n B-+   C\n   |   |\n   +---+",
        "@-B-+   |\n     C  |\n        +",
      ],
      case2: ["ABC\nDEF", "@-\n |"],
    };

    // Expected results (use input2map for transformation)
    const expectedLogs = [
      JSON.stringify(input2map("@--A---+\n       |\n B-+   C\n   |   |\n   +---+")),
      JSON.stringify(input2map("@-B-+   |\n     C  |\n        +")),
      JSON.stringify(input2map("ABC\nDEF")),
      JSON.stringify(input2map("@-\n |")),
    ];

    // Run the function
    turnTestsFromStrToArray(testString);

    // Assertions
    expect(consoleSpy).toHaveBeenCalledTimes(expectedLogs.length);
    expectedLogs.forEach((expectedLog, index) => {
      expect(consoleSpy).toHaveBeenNthCalledWith(index + 1, expectedLog);
    });
  });

  it("should handle an empty testString object", () => {
    const testString = {};

    // Run the function
    turnTestsFromStrToArray(testString);

    // Assertion: console.log should not be called
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should handle nested empty arrays", () => {
    const testString = {
      case1: [],
      case2: [],
    };

    // Run the function
    turnTestsFromStrToArray(testString);

    // Assertion: console.log should not be called
    expect(consoleSpy).not.toHaveBeenCalled();
  });
});