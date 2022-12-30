// move head one step, move tail as applicable by calulated directoin vector

// set both start positions to 0,0

const fs = require("fs");
let input = fs.readFileSync("./9/input.txt", "utf8").split("\n");

const tail = { x: 0, y: 0 };
const head = { x: 0, y: 0 };

const directions = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

function isTouching() {
  if (Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1) {
    return true;
  }
  return false;
}

function getVector() {
  let vector = [0, 0];
  if (isTouching()) {
    return vector;
  }

  if (head.x > tail.x) {
    vector[0] = 1;
  }
  if (head.x < tail.x) {
    vector[0] = -1;
  }
  if (head.y > tail.y) {
    vector[1] = 1;
  }
  if (head.y < tail.y) {
    vector[1] = -1;
  }

  return vector;
}

function movePointByVector(point, vector) {
  point.x += vector[0];
  point.y += vector[1];
}

let visited = new Set();

function move(line) {
  let [direction, steps] = line.split(" ");

  for (let i = 0; i < +steps; i++) {
    movePointByVector(head, directions[direction]);
    movePointByVector(tail, getVector());
    visited.add(`${tail.x},${tail.y}`);
  }
}

for (const line of input) {
  move(line);
}

console.log(visited.size);
