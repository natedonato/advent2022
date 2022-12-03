const fs = require("fs");
let input = fs.readFileSync("./3/input.txt", "utf8").split("\n");

const alpha = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let score = 0;
for(let j = 0; j < input.length; j+= 3){
  let seenItems = {};
  let duplicateItems = {};

  let line = input[j];

  for (let i = 0; i < line.length; i++) {
    let char = line.charAt(i);
    seenItems[char] = true;
  }

  line = input[j+1];

  for (let i = 0; i < line.length; i++) {
    let char = line.charAt(i);

    if (seenItems[char] === true) {
      duplicateItems[char] = true;
    }
  }

  line = input[j+2]
  let repeat = ""
  for (let i = 0; i < line.length; i++) {
    let char = line.charAt(i);

    if (duplicateItems[char] === true) {
      repeat = char;
    }
  }

  score += alpha.indexOf(repeat);
}

console.log(score);
