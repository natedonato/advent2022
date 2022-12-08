const fs = require("fs");
let input = fs.readFileSync("./8/input.txt", "utf8").split("\n");
input = input.map((line) => line.split(""));
input = input.map((row) => row.map((el) => +el));

function senicScore(x,y){
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;
  
  let height = input[x][y];
  // look left
  if(y === 0){
    left = 0
  }else{
    for(let i = y - 1; i >= 0; i--){
      left += 1;
      if(height <= input[x][i]){
        break;
      }
    }
  }
  // look right
  if(y === input[0].length - 1){
    right = 0
  }else{
    for(let i = y + 1; i < input[0].length; i++){
      right += 1;
      if(height <= input[x][i]){
        break;
      }
    }
  }

  // look up
  if (x === 0) {
    top = 0;
  } else {
    for (let i = x - 1; i >= 0; i--) {
      top += 1;
      if (height <= input[i][y]) {
        break;
      }
    }
  }

  if (x === input.length -1) {
    bottom = 0;
  } else {
    for (let i = x + 1; i < input.length; i++) {
      bottom += 1;
      if (height <= input[i][y]) {
        break;
      }
    }
  }


  let totalScore = left * top * right * bottom;
  return totalScore;
}

let top = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    let score = senicScore(i, j);
    if (score > top) {
      top = score;
    }
  }
}

console.log("top score", top);