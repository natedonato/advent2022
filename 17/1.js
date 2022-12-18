const fs = require('fs')
let ogInput = fs.readFileSync("./17/input.txt", "utf8");
// let ogInput = "<<<<<<<"
let input = ogInput.split('');

const rocks = [
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
  [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
];


let maxHeight = 0;
let rockIdx = 0;

let state = {};

for(let i = 0; i < 2022; i++){
  // spawn in rock
  let nextRock = rocks[rockIdx].slice(0).map(el => {return({...el})});

  nextRock.forEach(el => el.y = el.y + maxHeight + 4);
  nextRock.forEach(el => el.x = el.x + 2);

  // console.log(nextRock);

  // fall loop
  let falling = true;

  while(falling){
    // console.log('\n')

    //push rock direction
    let direction = input.shift();
    if(direction === undefined){
      input = ogInput.split("");
      direction = input.shift();
    }

    // console.log('direction', direction)
    let dx = -1

    if(direction === ">"){
      dx = 1;
    }

    if(!nextRock.some( el => {
      // rock outside bounds
      if(el.x + dx < 0 || el.x + dx > 6){
        // console.log('rock hits wall')
        return true;
      }
      // rock hits wall
      if(state[`${el.x + dx},${el.y}`] === "rock"){
        // console.log('rock hits rock')
        return true
      }
      return false;
    })){
      // console.log("rock moves " + dx)
      nextRock.forEach(el => el.x += dx);
    }

  
    //drop rock one space down & stop if hits anything
    if(nextRock.some(el => el.y - 1 < 1 || state[`${el.x},${el.y - 1}`] === "rock")){
      // console.log('rock settles')
      falling = false;
    }else{
      // console.log('rock falls')
      nextRock.forEach(el => el.y -= 1);
    }
  }

  rockIdx += 1;
  rockIdx = rockIdx % 5;
  maxHeight = Math.max(maxHeight, ...nextRock.map(el => el.y));
  console.log("max height", maxHeight);
  nextRock.forEach((el) => state[`${el.x},${el.y}`] = "rock");
}




// console.log(state);

function prettyPrint() {
  let rows = [];
  
  for(let y = 1; y < maxHeight+ 2; y++){
    let row = '|'
    for(let x = 0; x <= 6; x++){
      if(state[`${x},${y}`] === "rock"){
        row += "#"
      }else{
        row += '.'
      }
    }
    row +="|"
    rows.unshift(row);
  }
  for(const row of rows){
    console.log(row);
  }
  console.log("+-------+");
}

prettyPrint();

console.log(maxHeight);