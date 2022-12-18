const fs = require("fs");
let input = fs.readFileSync("./18/input.txt", "utf8").split('\n').map(el => el.split(',').map(el => +el));
// let input = [[1,1,1],[2,1,1]]

let cubemap = {}

for(const cube of input){
  cubemap[cube.join(',')] = true;
}

let vectors = [
  [0,0,1],
  [0,0,-1],
  [0,1,0],
  [0,-1,0],
  [1,0,0],
  [-1,0,0]
]

let faces = 0;

for(const cube of input){
  for(const vector of vectors){
    let adjacentCoord = [];
    for(let i = 0; i < 3; i++){
      adjacentCoord.push(cube[i] + vector[i])
    }
    if(cubemap[adjacentCoord.join(',')] !== true){
      faces += 1;
    }
  }
}

console.log(faces);