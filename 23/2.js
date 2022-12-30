const fs = require("fs");
let input = fs
  .readFileSync("23/input.txt", "utf-8")
  .split("\n")
  .map((el) => el.split(""));

let elves = {};

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "#") {
      elves[`${i},${j}`] = "standing";
    }
  }
}

let rounds = 0;

function anyNeighbors(i, j) {
  // around
  let neighbors = [
    // above
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],

    // sides
    [i, j - 1],
    [i, j + 1],

    // below
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];

  for (const coord of neighbors) {
    let [col, row] = coord;
    if (elves[`${col},${row}`] !== undefined) {
      return true;
    }
  }
  return false;
}

function proposeMove(i, j) {
  let north = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
  ];
  let south = [
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ];
  let west = [
    [i - 1, j - 1],
    [i, j - 1],
    [i + 1, j - 1],
  ];
  let east = [
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1],
  ];

  let directions = [
    [checkUnoccupied(north), [i - 1, j]],
    [checkUnoccupied(south), [i + 1, j]],
    [checkUnoccupied(west), [i, j - 1]],
    [checkUnoccupied(east), [i, j + 1]],
  ];

  for (let i = 0; i < rounds % 4; i++) {
    directions.push(directions.shift());
  }

  for (const item of directions) {
    if (item[0] === true) {
      return item[1];
    }
  }

  // console.log('no move detected?')
  return "standing";
}

function checkUnoccupied(arr) {
  for (const coord of arr) {
    let [col, row] = coord;
    if (elves[`${col},${row}`] !== undefined) {
      return false;
    }
  }

  return true;
}

prettyPrint();

let unmoved = false;
let i = 0;
while (unmoved === false) {
  i += 1;
  simulateRound();
}

function simulateRound() {
  unmoved = true;
  let elfList = Object.keys(elves);
  elfList = elfList
    .map((el) => el.split(",").map((el) => +el))
    .sort((a, b) => a[0] - b[0]);

  let proposedMoves = {};

  // first check if elf will propose a move
  for (const elf of elfList) {
    if (anyNeighbors(elf[0], elf[1])) {
      let proposedMove = proposeMove(elf[0], elf[1]);
      if (proposedMove !== "standing") {
        if (proposedMoves[proposedMove] !== undefined) {
          proposedMoves[proposedMove] = "collision";
        } else {
          proposedMoves[proposedMove] = `${elf[0]},${elf[1]}`;
        }
      }
    }
  }

  // move elves that won't collide
  for (const [key, value] of Object.entries(proposedMoves)) {
    if (value !== "collision") {
      unmoved = false;
      elves[key] = "standing";
      delete elves[value];
    }
  }

  rounds += 1;
}

function prettyPrint(tally) {
  let count = 0;

  console.log("\n");
  // find bounds
  let elfList = Object.keys(elves);
  elfList = elfList.map((el) => el.split(",").map((el) => +el));

  let rowMin = Math.min(...elfList.map((el) => el[0]));
  let rowMax = Math.max(...elfList.map((el) => el[0]));
  let colMin = Math.min(...elfList.map((el) => el[1]));
  let colMax = Math.max(...elfList.map((el) => el[1]));

  for (let i = rowMin; i <= rowMax; i++) {
    let str = "";

    for (let j = colMin; j <= colMax; j++) {
      if (elves[`${i},${j}`] !== undefined) {
        str += "#";
      } else {
        if (tally === true) {
          count += 1;
        }
        str += ".";
      }
    }
    console.log(str);
  }
  if (tally === true) {
    console.log(count);
  }
}
