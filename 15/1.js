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

let positionCount = 0;

let rowY = 2000000;

for (let i = minX - maxDist; i < maxX + maxDist; i++) {
  let point = { x: i, y: rowY };
  if (testPoint(point) === false) {
    positionCount += 1;
  }
}

console.log(positionCount);

function testPoint(point) {
  // if point is a beacon, it "may contain a beacon" :P
  if (beacons.some((el) => el.x === point.x && el.y === point.y)) {
    return true;
  }

  // if point is closer than beacon dist for any sensor, it isn't a beacon
  for ({ sensor, dist } of sensorsDists) {
    if (ManhattanDist(sensor, point) <= dist) {
      return false;
    }
  }
  // otherwise it may contain a beacon
  return true;
}
