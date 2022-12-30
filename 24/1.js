const fs = require("fs");
let input = fs
  .readFileSync("24/input.txt", "utf8")
  .split("\n")
  .map((el) => el.split(""));

// console.log(input.map((el) => el.join("")));

let storms = {
  0: {},
};

let stormChars = "^v<>";

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    let el = input[i][j];
    if (stormChars.includes(el)) {
      storms[0][`${i},${j}`] = el;
    }
  }
}

let vectors = {
  "^": [-1, 0], // move up
  v: [1, 0], // move down
  ">": [0, 1], // move right
  "<": [0, -1], // move left
};

let visited = { 0: { "0,0": true } };

function makeMinute(minute) {
  storms[minute] = {};
  if (visited[minute] === undefined) {
    visited[minute] = {};
  }

  for (let [key, value] of Object.entries(storms[minute - 1])) {
    for (let val of value.split("")) {
      let [i, j] = key.split(",").map((el) => +el);
      let vect = vectors[val];
      i += vect[0];
      j += vect[1];

      if (i === 0) {
        i = input.length - 2;
      }
      if (i === input.length - 1) {
        i = 1;
      }
      if (j === 0) {
        j = input[0].length - 2;
      }
      if (j === input[0].length - 1) {
        j = 1;
      }
      if (storms[minute][`${i},${j}`] === undefined) {
        storms[minute][`${i},${j}`] = val;
      } else {
        storms[minute][`${i},${j}`] += val;
      }
    }
  }
}

let possibleMoves = [
  [0, 0], // stay still
  [1, 0], // down
  [-1, 0], // up
  [0, 1], // right
  [0, -1], // left
];

function bfs() {
  let start = [[0, 1], 0, []];

  let queue = [start];

  while (queue.length > 0) {
    let [pos, minute, path] = queue.shift();
    let [i, j] = pos;

    if (i === input.length - 1 && j === input[0].length - 2) {
      console.log("exited!");
      console.log(path);
      return minute;
    }

    minute += 1;

    if (storms[minute] === undefined) {
      makeMinute(minute);
    }

    for (const vect of possibleMoves) {
      let [nextI, nextJ] = [i + vect[0], j + vect[1]];
      if (
        nextI >= 0 && // not out of bounds
        input[nextI][nextJ] !== "#" &&
        !visited[minute][`${nextI},${nextJ}`] === true &&
        storms[minute][`${nextI},${nextJ}`] === undefined
      ) {
        visited[minute][`${nextI},${nextJ}`] = true;
        queue.push([[nextI, nextJ], minute, [...path, [nextI, nextJ]]]);
      }
    }
  }
}

function printMap(minute) {
  for (let i = 0; i < input.length; i++) {
    let row = "";
    for (let j = 0; j < input[0].length; j++) {
      if (storms[minute][`${i},${j}`]) {
        if (storms[minute][`${i},${j}`].length > 1) {
          row += storms[minute][`${i},${j}`].length;
        } else {
          row += storms[minute][`${i},${j}`];
        }
      } else {
        row += ".";
      }
    }
    console.log(row);
  }
}

console.log(bfs());
