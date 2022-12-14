const fs = require("fs");
let input = fs
  .readFileSync("./14/input.txt", "utf8")
  .split("\n")
  .map((el) => el.split(" -> "));

// get bounds for pretty print
let x = [];
let y = [];
for (const line of input) {
  for (const point of line) {
    let [x1, y1] = point.split(",");
    x.push(+x1);
    y.push(+y1);
  }
}
x = x.sort((a, b) => a - b);
y = y.sort((a, b) => a - b);
let xmin = x[0] - 1;
let xmax = x[x.length - 1] + 1;
let ymin = 0;
let ymax = y[y.length - 1] + 1;

let objects = {};

// pretty print the sand picture
function prettyPrint() {
  for (let y = ymin; y < ymax + 1; y++) {
    let line = "";
    for (let x = xmin; x < xmax; x++) {
      let type = objects[`${x},${y}`];
      if (type === undefined) {
        line += ".";
      } else if (type === "rock") {
        line += "#";
      } else if (type === "sand") {
        line += "O";
      }
    }
    console.log(line);
  }
  let lastLine = "";
  for (let x = xmin; x < xmax; x++) {
    lastLine += "#"
  }
  console.log(lastLine);
}

for (const line of input) {
  let prevPoint = line[0].split(",").map((el) => +el);
  for (let i = 1; i < line.length; i++) {
    let nextPoint = line[i].split(",").map((el) => +el);
    connectPoints(prevPoint, nextPoint);
    prevPoint = nextPoint;
  }
}

// fills in between two points with rock objects
function connectPoints(p1, p2) {
  let [x1, y1] = p1;
  let [x2, y2] = p2;

  for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
    for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
      objects[`${j},${i}`] = "rock";
    }
  }
}

let settling = true;
while (settling === true) {
  let individualFalling = true;
  let sand = [500, 0];
  while (individualFalling === true) {
    let [x, y] = sand;
    if (objects[`${x},${y + 1}`] === undefined && y < ymax) {
      // fall vertical
      sand[1] += 1;
    } else if (objects[`${x - 1},${y + 1}`] === undefined && y < ymax) {
      // fall left
      sand[0] -= 1;
      sand[1] += 1;
      xmin = Math.min(xmin, sand[0] - 2)
    } else if (objects[`${x + 1},${y + 1}`] === undefined && y < ymax) {
      // fall right
      sand[0] += 1;
      sand[1] += 1;
      xmax = Math.max(xmax, sand[0] + 3);
    } else {
      // sand can't fall
      objects[`${x},${y}`] = "sand";
      individualFalling = false;
      if (x === 500 && y === 0) {
        settling = false;
      }
    }
  }
  // prettyPrint();
}

// prettyPrint();

let totalSand = 0;
Object.values(objects).forEach((el) => {
  if (el === "sand") {
    totalSand += 1;
  }
});

console.log("total sand:", totalSand);
