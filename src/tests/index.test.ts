import { followPath } from "..";
import { tests } from "./mocks";
// Test Cases
describe("followPath valid maps function", () => {
  it("should pass on basic example string & arrray", () => {
    tests.stringValid.basicEx.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
    tests.arrayValid.basicEx.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
  });

  it("should pass on intersections example string & arrray", () => {
    tests.stringValid.intersections.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
    tests.arrayValid.intersections.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
  });

  it("should pass on letters on turns example string & arrray", () => {
    tests.stringValid.lettersOnTurns.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
    tests.arrayValid.lettersOnTurns.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
  });

  it("should pass on doubleCollection example string & arrray", () => {
    tests.stringValid.doubleCollection.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
    tests.arrayValid.doubleCollection.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
  });

  it("should pass on compact example string & arrray", () => {
    tests.stringValid.compact.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
    tests.arrayValid.compact.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
  });

  it("should pass on ignoreAfterEnd example string & arrray", () => {
    tests.stringValid.ignoreAfterEnd.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
    tests.arrayValid.ignoreAfterEnd.forEach((testcase) => {
      expect(followPath(testcase[0])).toStrictEqual({ letters: testcase[1], path: testcase[2] });
    });
  });
});

describe("followPath invalid maps function", () => {
  it("should pass on invalid basic example string & arrray", () => {
    tests.stringInvalid.missingStart.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
    tests.arrayInvalid.missingStart.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
  });

  it("should pass on invalid multipleStarts example string & arrray", () => {
    tests.stringInvalid.multipleStarts.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
    tests.arrayInvalid.multipleStarts.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
  });

  it("should pass on invalid multipleEnds example string & arrray", () => {
    tests.stringInvalid.multipleEnds.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
    tests.arrayInvalid.multipleEnds.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
  });

  it("should pass on invalid fork example string & arrray", () => {
    tests.stringInvalid.fork.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
    tests.arrayInvalid.fork.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
  });

  it("should pass on invalid multipleStartingPaths example string & arrray", () => {
    tests.stringInvalid.multipleStartingPaths.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
    tests.arrayInvalid.multipleStartingPaths.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow(
        "Too many or too few starting or ending characters found. Possible fork."
      );
    });
  });

  it("should pass on invalid fakeTurn example string & arrray", () => {
    tests.stringInvalid.fakeTurn.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow("Zero possible directions - broken path!");
    });
    tests.arrayInvalid.fakeTurn.forEach((testcase) => {
      expect(() => followPath(testcase[0])).toThrow("Zero possible directions - broken path!");
    });
  });
});
