const fs = require("fs");
let input = fs.readFileSync("./day1-input.txt", "utf8");

input = input.split("\n\n");

let max = 0;

input.forEach((elf) => {
  let cals = 0;
  elf.split("\n").map((el) => (cals += parseInt(el)));
  if (cals > max) {
    max = cals;
  }
});

console.log(max);
