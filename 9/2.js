// move head one step, move each tail node as applicable by calulated direction vector

// set both start positions to 0,0

const fs = require("fs");
let input = fs.readFileSync("./9/input.txt", "utf8").split("\n");

const node = { x: 0, y: 0 };
const rope = [];

for (let i = 0; i < 10; i++) {
  rope.push({ ...node });
}

const directions = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

function isTouching(nodeA, nodeB) {
  if (Math.abs(nodeA.x - nodeB.x) <= 1 && Math.abs(nodeA.y - nodeB.y) <= 1) {
    return true;
  }
  return false;
}

function getVector(nodeA, nodeB) {
  let vector = [0, 0];
  if (isTouching(nodeA, nodeB)) {
    return vector;
  }

  if (nodeA.x > nodeB.x) {
    vector[0] = 1;
  }
  if (nodeA.x < nodeB.x) {
    vector[0] = -1;
  }
  if (nodeA.y > nodeB.y) {
    vector[1] = 1;
  }
  if (nodeA.y < nodeB.y) {
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
    movePointByVector(rope[0], directions[direction]);
    for (let i = 1; i < 10; i++) {
      movePointByVector(rope[i], getVector(rope[i - 1], rope[i]));
    }
    visited.add(`${rope[9].x},${rope[9].y}`);
  }
}

for (const line of input) {
  move(line);
}

console.log(visited.size);

// bounds = [
//   [-201, 94],
//   [-67, 136],
// ];
