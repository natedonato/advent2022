const fs = require("fs");
let input = fs.readFileSync("./15/input.txt", "utf8").split("\n");

input = input.map((el) => {
  let [sensor, beacon] = el
    .substring(10)
    .split(": closest beacon is at ")
    .map((el) => toCoords(el));
  return [sensor, beacon];
});

function toCoords(str) {
  let [x, y] = str
    .substring(2)
    .split(", y=")
    .map((el) => parseInt(el));
  return { x, y };
}

function ManhattanDist(p1, p2) {
  let deltaX = Math.abs(p1.x - p2.x);
  let deltaY = Math.abs(p1.y - p2.y);
  return deltaX + deltaY;
}

// find the maximum manhattan dist between sensor and beacon;
let maxDist = 0;
let minX = input[0][0].x;
let maxX = input[0][0].x;

let sensorsDists = [];

let beacons = [];

for (const pair of input) {
  let [sensor, beacon] = pair;
  let dist = ManhattanDist(sensor, beacon);
  minX = Math.min(sensor.x, minX);
  maxX = Math.max(sensor.x, maxX);
  maxDist = Math.max(dist, maxDist);

  beacons.push(beacon);
  sensorsDists.push({ sensor, dist });
}

console.log("max distance", maxDist);
console.log("minimum sensor X", minX);
console.log("maxsensor X", maxX);

let maxCoord = 4000000;

// way too slow to check all points
// for(let i = 0; i <= maxCoord; i++){
//   console.log(i / 4000000 * 100);
//   for(let j = 0; j <= maxCoord; j++){
//     let point = {x: i, y: j};
//     testPoint(point);
//   }
// }

// beacon must be just outside the range of a sensor, so just test points outside sensor range
let edgePoints = [];

function collectEdgePoints(sensor, dist) {
  dist += 1;
  let dx = dist;
  let dy = 0;

  for (let i = 0; i <= dist; i++) {
    edgePoints.push({ x: sensor.x + dx, y: sensor.y + dy });
    edgePoints.push({ x: sensor.x - dx, y: sensor.y - dy });
    dx -= 1;
    dy += 1;
  }
}

for ({ sensor, dist } of sensorsDists) {
  collectEdgePoints(sensor, dist);
}

console.log("total points to test:", edgePoints.length);

for (point of edgePoints) {
  if (testPoint(point)) {
    return;
  }
}

function testPoint(point) {
  // if point out of bounds skip
  if (point.x < 0 || point.y < 0 || point.x > maxCoord || point.y > maxCoord) {
    return false;
  }

  // if point is closer than beacon dist for any sensor, it isn't a beacon
  for ({ sensor, dist } of sensorsDists) {
    if (ManhattanDist(sensor, point) <= dist) {
      return false;
    }
  }
  // otherwise it is the beacon
  console.log("beacon at", point);
  console.log("tuning frequency:", point.x * 4000000 + point.y);
  return true;
}
