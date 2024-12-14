export const tests = {
  stringValid: {
    basicEx: [
      `
@---A---+
        |
x-B-+   C
    |   |
    +---+`.trim(),
    ],
    intersections: [
      `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`.trim(),
      `    +-L-+
    |  +A-+
  @B|+ ++ H
    ++    x`.trim(),
    ],
    lettersOnTurns: [
      `
  @---A---+
          |
  x-B-+   |
      |   |
      +---C`.trim(),
    ],
    doubleCollection: [
      `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x`.trim(),
    ],
    compact: [
      `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x`.trim(),
    ],
    ignoreAfterEnd: [
      `
  @-A--+
       |
       +-B--x-C--D`.trim(),
    ],
  },

  stringInvalid: {
    missingStart: [
      `
  -A---+
       |
x-B-+   C
   |   |
   +---+`.trim(),
    ],
    multipleStarts: [
      `
@--A---+
       |
@B-+   C
   |   |
   +---+`.trim(),
      `
 @--A-@-+
        |
x-B-+   C
    |   |
    +---+`.trim(),
      `
@--A---+
       |
       C
       x
   @-B-+`.trim(),
      `
@--A--x

x-B-+
   |
   @`.trim(),
    ],
    multipleEnds: [
      `
@--A---+
       |
 x-+   C-x
   |   |
   +---+`.trim(),
      `
 @--A-@-+
        |
x-B-+   C
    |   |
    +-x-+`.trim(),
      `
@--A---+
       |
   x   C
       x
   @-B-+`.trim(),
      `
@--A--x

x-B-+
   |
   @`.trim(),
    ],
    fork: [
      `
     x-B
       |
@--A---+
       |
  x+   C
   |   |
   +---+`.trim(),
    ],
    multipleStartingPaths: [
      `
x-B-@-A-x`.trim(),
    ],
    fakeTurn: [
      `
@-A-+-B-x`.trim(),
    ],
  },

  arrayValid: {
    basicEx: [
      [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ],
    ],
    intersections: [
      [
        ["@"],
        ["|", " ", "+", "-", "C", "-", "-", "+"],
        ["A", " ", "|", " ", " ", " ", " ", "|"],
        ["+", "-", "-", "-", "B", "-", "-", "+"],
        [" ", " ", "|", " ", " ", " ", " ", " ", " ", "x"],
        [" ", " ", "|", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", "+", "-", "-", "-", "D", "-", "-", "+"],
      ],
    ],
    lettersOnTurns: [
      [
        ["@", "-", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "C"],
      ],
    ],
    doubleCollection: [
      [
        [" ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
        [" ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
        ["@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
        [" ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
        [" ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
      ],
    ],
    compact: [
      [
        [" ", "+", "-", "L", "-", "+"],
        [" ", "|", " ", " ", "+", "A", "-", "+"],
        ["@", "B", "+", " ", "+", "+", " ", "H"],
        [" ", "+", "+", " ", " ", " ", " ", "x"],
      ],
    ],
    ignoreAfterEnd: [
      [
        ["@", "-", "A", "-", "-", "+"],
        [" ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", "+", "-", "B", "-", "-", "x", "-", "C", "-", "-", "D"],
      ],
    ],
  },

  arrayInvalid: {
    missingStart: [
      [
        [" ", " ", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", "+", "-", "-", "-", "+"],
      ],
    ],
    multipleStarts: [
      [
        ["@", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        ["@", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", "+", "-", "-", "-", "+"],
      ],
      [
        [" ", "@", "-", "-", "A", "-", "@", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "-", "-", "+"],
      ],
      [
        ["@", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", "C"],
        [" ", " ", " ", " ", " ", " ", " ", "x"],
        [" ", " ", " ", "@", "-", "B", "-", "+"],
      ],
      [
        ["@", "-", "-", "A", "-", "-", "x"],
        [],
        ["x", "-", "B", "-", "+"],
        [" ", " ", " ", "|"],
        [" ", " ", " ", "@"],
      ],
    ],
    multipleEnds: [
      [
        ["@", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", "x", "-", "+", " ", " ", " ", "C", "-", "x"],
        [" ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", "+", "-", "-", "-", "+"],
      ],
      [
        [" ", "@", "-", "-", "A", "-", "@", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
        ["x", "-", "B", "-", "+", " ", " ", " ", "C"],
        [" ", " ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", " ", "+", "-", "x", "-", "+"],
      ],
      [
        ["@", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", "x", " ", " ", " ", "C"],
        [" ", " ", " ", " ", " ", " ", " ", "x"],
        [" ", " ", " ", "@", "-", "B", "-", "+"],
      ],
      [
        ["@", "-", "-", "A", "-", "-", "x"],
        [],
        ["x", "-", "B", "-", "+"],
        [" ", " ", " ", "|"],
        [" ", " ", " ", "@"],
      ],
    ],
    fork: [
      [
        [" ", " ", " ", " ", " ", "x", "-", "B"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        ["@", "-", "-", "A", "-", "-", "-", "+"],
        [" ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", "x", "+", " ", " ", " ", "C"],
        [" ", " ", " ", "|", " ", " ", " ", "|"],
        [" ", " ", " ", "+", "-", "-", "-", "+"],
      ],
    ],
    multipleStartingPaths: [[[], ["x", "-", "B", "-", "@", "-", "A", "-", "x"]]],
    fakeTurn: [[[], ["@", "-", "A", "-", "+", "-", "B", "-", "x"]]],
  },
};
