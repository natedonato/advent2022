const fs = require("fs");
let input = fs.readFileSync("./3/input.txt", "utf8").split("\n");

const alpha = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

let score = 0;

for(const line of input){
  let seenItems = {};
  let duplicateItems = {};

  for(let i = 0; i < line.length/2; i++){
    let char = line.charAt(i) 
    seenItems[char] = true;
  }
  
  for(let i = line.length/2; i < line.length; i++){
    let char = line.charAt(i); 

    if(seenItems[char] === true){
      duplicateItems[char] = true;
    }
  }

  let repeat = Object.keys(duplicateItems)[0]
  score += alpha.indexOf(repeat);
}

console.log(score);