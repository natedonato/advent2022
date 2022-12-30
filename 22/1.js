const fs = require("fs");
let input = fs.readFileSync("22/input.txt", "utf-8").split("\n");
let directions = input.pop();
input.pop();
input = input.map((el) => el.split(""));

let y = 0;
let x = 0;
while (input[y][x] === " ") {
  x += 1;
}

let vectors = [
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
  [0, -1], // up
];

let wraps = [wrapRight, wrapDown, wrapLeft, wrapUp];

let dir = 0;
let vector = vectors[dir];

function getNextSteps() {
  let steps = "";
  while (directions.length > 0 && !isNaN(+directions.charAt(0))) {
    steps += directions.charAt(0);
    directions = directions.substring(1);
  }
  return +steps;
}

function getNextTurn() {
  if (directions.length === 0) {
    return "END";
  }
  if (directions.charAt(0) === "L") {
    dir -= 1;
    if (dir < 0) {
      dir = 3;
    }
  } else {
    dir += 1;
    if (dir > 3) {
      dir = 0;
    }
  }
  vector = vectors[dir];

  directions = directions.substring(1);
}

/////
// parse next direction
// turn with appropriate vector
// move in direction
// if hit a rock. stop
// if hit an edge and next edge is not a rock, wrap around
let moving = true;
while (moving) {
  let steps = getNextSteps();

  move(steps);

  if (getNextTurn() === "END") {
    moving = false;
  }
}

function move(steps) {
  for (let i = 0; i < steps; i++) {
    let [nextX, nextY] = [x + vector[0], y + vector[1]];
    [nextX, nextY] = wraps[dir](nextX, nextY);
    if (input[nextY][nextX] === "#") {
      return;
    } else {
      x = nextX;
      y = nextY;
    }
  }

  return;
}

function wrapRight(x, y) {
  while (input[y][x] !== "." && input[y][x] !== "#") {
    if (input[y][x] === undefined) {
      x = 0;
    } else if (input[y][x] === " ") {
      x += 1;
    }
  }

  return [x, y];
}

function wrapLeft(x, y) {
  while (input[y][x] !== "." && input[y][x] !== "#") {
    if (input[y][x] === undefined) {
      x = input[y].length - 1;
    } else if (input[y][x] === " ") {
      x -= 1;
    }
  }
  return [x, y];
}

function wrapDown(x, y) {
  while (!input[y] || (input[y][x] !== "." && input[y][x] !== "#")) {
    if (input[y] === undefined) {
      y = 0;
    } else if (input[y][x] === " " || input[y][x] === undefined) {
      y += 1;
    }
  }
  return [x, y];
}

function wrapUp(x, y) {
  while (!input[y] || (input[y][x] !== "." && input[y][x] !== "#")) {
    if (input[y] === undefined) {
      y = input.length - 1;
    } else if (input[y][x] === " " || input[y][x] === undefined) {
      y -= 1;
    }
  }
  return [x, y];
}

function printState() {
  for (let i = 0; i < input.length; i++) {
    let str = "";
    for (let j = 0; j < input[i].length; j++) {
      if (j === x && i === y) {
        str += "X";
      } else {
        str += input[i][j];
      }
    }
    console.log(str);
  }
}

let dirScores = [0, 1, 2, 3];

console.log("x / col", x);
console.log("y / row", y);
console.log("dir", dir);

console.log("finalScore, ", 1000 * (y + 1) + 4 * (x + 1) + dirScores[dir]);
