const fs = require("fs");
let input = fs.readFileSync("./day1-input.txt", "utf8");
input = input.split("\n\n");

let max = [0, 0, 0];

input.forEach((elf) => {
  let cals = 0;
  elf.split("\n").map((el) => (cals += parseInt(el)));

  if (cals >= max[0]) {
    max.push(cals);
    max = max.sort((a, b) => a - b);
    max.shift();
  }
});

console.log(max.reduce((acc, el) => (acc += el)));
