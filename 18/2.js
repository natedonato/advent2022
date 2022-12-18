const fs = require("fs");
let input = fs
  .readFileSync("./18/input.txt", "utf8")
  .split("\n")
  .map((el) => el.split(",").map((el) => +el));

// find bounds, increase by one in every dimension for breathing room
// start at outside point

// bfs through air space, counting faces as we hit neighboring cubes
// don't revisit visited spaces
// don't go through cubes

let cubemap = {};

// find minimum values in all dimensions
let xmin = input[0][0];
let ymin = input[0][1];
let zmin = input[0][2];
let xmax = input[0][0];
let ymax = input[0][1];
let zmax = input[0][2];

// map cubes and update boundaries
for (const cube of input) {
  let [x, y, z] = cube;
  xmin = Math.min(xmin, x);
  xmax = Math.max(xmax, x);
  ymin = Math.min(ymin, y);
  ymax = Math.max(ymax, y);
  zmin = Math.min(zmin, z);
  zmax = Math.max(zmax, z);

  cubemap[cube.join(",")] = "lava";
}

// expand boundaries by one unit for breathing room on all sides
xmin -= 1;
ymin -= 1;
zmin -= 1;
xmax += 1;
ymax += 1;
zmax += 1;

console.log();

// check point is out of bounds
function outOfBounds(point) {
  if (
    xmin > point[0] ||
    xmax < point[0] ||
    ymin > point[1] ||
    ymax < point[1] ||
    zmin > point[2] ||
    zmax < point[2]
  ) {
    return true;
  }
  return false;
}

// valid steam travel direction vectors
let vectors = [
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
];

let faces = 0;

let startingCube = [xmin, ymin, zmin];
cubemap[startingCube.join(",")] = "steam";

let queue = [startingCube];

// bfs
while (queue.length > 0) {
  currentCube = queue.shift();
  let adjacents = [];

  for (const vector of vectors) {
    // find adjacent spaces
    let adjacentCoord = [];
    for (let i = 0; i < 3; i++) {
      adjacentCoord.push(currentCube[i] + vector[i]);
    }
    if (!outOfBounds(adjacentCoord)) {
      // if adjacent space is lava, increment face count
      if (cubemap[adjacentCoord.join(",")] === "lava") {
        faces += 1;
        // if adjacent space isn't lava, isn't already visited by our steam, and isn't out of bounds, add it to the queue
      } else if (cubemap[adjacentCoord.join(",")] !== "steam") {
        adjacents.push(adjacentCoord);
      }
    }
  }

  adjacents.forEach((cube) => {
    cubemap[cube.join(",")] = "steam";
    queue.push(cube);
  });
}

console.log(faces);
