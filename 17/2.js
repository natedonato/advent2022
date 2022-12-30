const fs = require("fs");
let ogInput = fs.readFileSync("./17/input.txt", "utf8");
let input = ogInput.split("");

const rocks = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
];

let maxHeight = 0;
let rockIdx = 0;

let state = {};

let serials = [];
let target = 1000000000000;
let matchFound = false;

let jumpedHeight = 0;

for (let i = 0; i < target; i++) {
  // spawn in rock
  let nextRock = rocks[rockIdx].slice(0).map((el) => {
    return { ...el };
  });

  nextRock.forEach((el) => (el.y = el.y + maxHeight + 4));
  nextRock.forEach((el) => (el.x = el.x + 2));

  // fall loop
  let falling = true;

  while (falling) {
    //push rock direction
    let direction = input.shift();
    if (direction === undefined) {
      input = ogInput.split("");
      direction = input.shift();

      if (!matchFound) {
        // make serials
        let serial = [serialize(), rockIdx, i, maxHeight];
        let match = serials.find(
          (el) => el[0] === serial[0] && el[1] === serial[1]
        );
        if (match !== undefined) {
          console.log("match found!");
          console.log("cycle length", serial[2] - match[2]);

          console.log("current", i);
          console.log("remaining pieces", target - i);
          matchFound = true;
          let cycleLength = serial[2] - match[2];

          let cycleHeight = serial[3] - match[3];
          let skippedCycles = Math.floor((target - i) / cycleLength);
          console.log("skipping", skippedCycles, "cycles");
          target -= cycleLength * skippedCycles;
          jumpedHeight += cycleHeight * skippedCycles;
          console.log("now remaining", target - i, "pieces to drop");
          console.log("skipped over height of", jumpedHeight);
        } else {
          serials.unshift(serial);
        }
      }
    }

    let dx = -1;
    if (direction === ">") {
      dx = 1;
    }
    if (
      !nextRock.some((el) => {
        // rock outside bounds
        if (el.x + dx < 0 || el.x + dx > 6) {
          return true;
        }
        // rock hits wall
        if (state[`${el.x + dx},${el.y}`] === "rock") {
          return true;
        }
        return false;
      })
    ) {
      nextRock.forEach((el) => (el.x += dx));
    }

    //drop rock one space down & stop if hits anything
    if (
      nextRock.some(
        (el) => el.y - 1 < 1 || state[`${el.x},${el.y - 1}`] === "rock"
      )
    ) {
      // console.log('rock settles')
      falling = false;
    } else {
      // console.log('rock falls')
      nextRock.forEach((el) => (el.y -= 1));
    }
  }

  rockIdx += 1;
  rockIdx = rockIdx % 5;
  maxHeight = Math.max(maxHeight, ...nextRock.map((el) => el.y));
  nextRock.forEach((el) => (state[`${el.x},${el.y}`] = "rock"));
}

function serialize(x = 12) {
  let str = "";

  for (let y = maxHeight - x; y < maxHeight + 1; y++) {
    str += "|";
    for (let x = 0; x <= 6; x++) {
      if (state[`${x},${y}`] === "rock") {
        str += "#";
      } else {
        str += ".";
      }
    }
    str += "|";
  }

  return str;
}

console.log(maxHeight + jumpedHeight);
