export const tests = {
  stringValid: {
    basicEx: [
      `
@---A---+
        |
x-B-+   C
    |   |
    +---+`,
    ],
    intersections: [
      `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`,
      `    +-L-+
    |  +A-+
  @B|+ ++ H
    ++    x`,
    ],
    lettersOnTurns: [
      `
  @---A---+
          |
  x-B-+   |
      |   |
      +---C`,
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
             x`,
    ],
    compact: [
      `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x`,
    ],
    ignoreAfterEnd: [
      `
  @-A--+
       |
       +-B--x-C--D`,
    ],
  },

  stringInvalid: {
    missingStart: [
      `
  -A---+
       |
x-B-+   C
   |   |
   +---+`,
    ],
    multipleStarts: [
      `
@--A---+
       |
@B-+   C
   |   |
   +---+`,
      `
 @--A-@-+
        |
x-B-+   C
    |   |
    +---+`,
      `
@--A---+
       |
       C
       x
   @-B-+`,
      `
@--A--x

x-B-+
   |
   @`,
    ],
    multipleEnds: [
      `
@--A---+
       |
 x-+   C-x
   |   |
   +---+`,
      `
 @--A-@-+
        |
x-B-+   C
    |   |
    +-x-+`,
      `
@--A---+
       |
   x   C
       x
   @-B-+`,
      `
@--A--x

x-B-+
   |
   @`,
    ],
    fork: [
      `
     x-B
       |
@--A---+
       |
  x+   C
   |   |
   +---+`,
    ],
    multipleStartingPaths: [
      `
x-B-@-A-x`,
    ],
    fakeTurn: [
      `
@-A-+-B-x`,
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
