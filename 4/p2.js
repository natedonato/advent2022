const fs = require("fs");
const input = fs.readFileSync("./4/input.txt", "utf8").split("\n");

let count = 0;

for (const line of input) {
  let [range1, range2] = line.split(",");
  let [min1, max1] = range1.split("-").map((el) => parseInt(el));
  let [min2, max2] = range2.split("-").map((el) => parseInt(el));

  if (
    (min1 >= min2 && min1 <= max2) ||
    (max1 >= min2 && max1 <= max2) ||
    (min2 >= min1 && min2 <= max1) ||
    (max2 >= min1 && max2 <= max1)
  ) {
    count += 1;
  }
}

console.log(count);
