const fs = require("fs");
let input = fs.readFileSync("22/input.txt", "utf-8").split("\n");
let directions = input.pop();
input.pop();
input = input.map((el) => el.split(""));

let i = 0;
let j = 0;
while (input[i][j] === " ") {
  j += 1;
}

// x,y
let vectors = [
  [1, 0, "v"], // down
  [0, 1, ">"], // right
  [-1, 0, "^"], // up
  [0, -1, "<"], // left
];

function getReverseDir(dir) {
  if (dir === 0) {
    return 2;
  }
  if (dir === 1) {
    return 3;
  }
  if (dir === 2) {
    return 0;
  }
  if (dir === 3) {
    return 1;
  }
}

let dir = 1;
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
  console.log(directions.charAt(0));
  if (directions.length === 0) {
    return "END";
  }
  if (directions.charAt(0) === "L") {
    dir += 1;
    if (dir > 3) {
      dir = 0;
    }
  } else {
    dir -= 1;
    if (dir < 0) {
      dir = 3;
    }
  }
  vector = vectors[dir];

  directions = directions.substring(1);
}

const wrappers = {};

makeWrap([50, 100], [50, 149], [50, 100], [99, 100], 0, 3); // okok

makeWrap([49, 150], [0, 150], [100, 100], [149, 100], 1, 3); //  okok

makeWrap([-1, 100], [-1, 149], [200, 0], [200, 49], 2, 2); // okok

makeWrap([0, 49], [49, 49], [149, -1], [100, -1], 3, 1); // okok

makeWrap([50, 49], [99, 49], [99, 0], [99, 49], 3, 0); // okok

makeWrap([-1, 50], [-1, 99], [150, -1], [199, -1], 2, 1); // okok

makeWrap([150, 50], [150, 99], [150, 50], [199, 50], 0, 3); //

// let vectors = [
//   [1, 0], // down 0
//   [0, 1], // right 1
//   [-1, 0], // up 2
//   [0, -1], // left 3
// ];

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
  for (let k = 0; k < steps; k++) {
    let [nextI, nextJ] = [i + vector[0], j + vector[1]];
    let nextDir = dir;
    if (wrappers[`${nextI},${nextJ},${dir}`] !== undefined) {
      [nextI, nextJ, nextDir] = wrappers[`${nextI},${nextJ},${dir}`];
    }
    if (input[nextI][nextJ] === "#") {
      return;
    } else if (input[nextI][nextJ] !== ".") {
      console.log("error out of bounds", nextI, nextJ, dir);
    } else {
      i = nextI;
      j = nextJ;
      dir = nextDir;
    }
    vector = vectors[dir];
  }
  return;
}

function wrap(x, y, dir) {
  return wrappers[`${x},${y},${dir}`];
}

// map line from x1,y1 x2y2 to x3,y3 x4,y4 and change direction from dir1 to dir2.

function makeWrap(p1, p2, p3, p4, dir1, dir2) {
  let [i1, j1] = p1;
  let [i2, j2] = p2;
  let [i3, j3] = p3;
  let [i4, j4] = p4;
  let points1 = makePoints(i1, j1, i2, j2);
  let points2 = makePoints(i3, j3, i4, j4);

  let v1 = vectors[dir2];
  let v2 = vectors[getReverseDir(dir1)];

  if (points1.length !== points2.length) {
    throw "ERROR";
  }

  for (let i = 0; i < points1.length; i++) {
    wrappers[`${points1[i][0]},${points1[i][1]},${dir1}`] = [
      points2[i][0] + v1[0],
      points2[i][1] + v1[1],
      dir2,
    ];
    wrappers[`${points2[i][0]},${points2[i][1]},${getReverseDir(dir2)}`] = [
      points1[i][0] + v2[0],
      points1[i][1] + v2[1],
      getReverseDir(dir1),
    ];
  }
}

// let vectors = [
//   [1, 0], // down
//   [0, 1], // right
//   [-1, 0], // up
//   [0, -1], // left
// ];

// 0: DOWN
// 1: RIGHT
// 2: UP
// 3: LEFT

function makePoints(i1, j1, i2, j2) {
  let points = [];

  if (i1 > i2 || j1 > j2) {
    for (let i = i1; i >= i2; i--) {
      for (let j = j1; j >= j2; j--) {
        points.push([i, j]);
      }
    }
  } else {
    for (let i = i1; i <= i2; i++) {
      for (let j = j1; j <= j2; j++) {
        points.push([i, j]);
      }
    }
  }

  return points;
}

function printState() {
  for (let i1 = 0; i1 < input.length; i1++) {
    let str = "";
    for (let j1 = 0; j1 < input[i1].length; j1++) {
      if (j1 === j && i1 === i) {
        str += "X";
      } else {
        str += input[i1][j1];
      }
    }
    console.log(str);
  }
}

let dirScores = [1, 0, 3, 2];

console.log("x / col", j);
console.log("y / row", i);
console.log("dir", dir);

console.log("finalScore, ", 1000 * (i + 1) + 4 * (j + 1) + dirScores[dir]);
