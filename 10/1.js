//  simulate a cycle:
//    if no current operation, start the next operation in this cycle
//    if operation in progress, continue / finish the operation
//    
//    noop takes one cycle
//    addx takes two cycles
// 

const fs = require("fs");
let input = fs.readFileSync("./10/input.txt", "utf8").split("\n");

let cycle = 0;
let op = null;
let i = 0;
let opTime = 0;
let notable = []

let x = 1;
getNextOp();

while(cycle <= 220){
  cycle += 1;
  if((cycle + 20) % 40 === 0){
    notable.push(x * cycle)
  }

  if(op.substring(0,4) === "noop"){
    getNextOp();
  }else if(op.substring(0,4) === "addx"){
    opTime += 1;
    if(opTime === 2){
      x += +op.substring(5)
      getNextOp();
    }
  }

}

function getNextOp(){
  op = input[i]
  i += 1;
  if(op.substring(0,4) === "addx"){
    opTime = 0;
  }
}

console.log(notable);


console.log(notable.reduce((a,b) => a+b, 0))