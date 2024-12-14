import { input2map } from "../helpers";
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
    console.log("-----------------------------------\n", result);
    expect(result).toEqual(expectedOutput);
  });
});
