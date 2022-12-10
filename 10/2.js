const fs = require("fs");
let input = fs.readFileSync("./10/input.txt", "utf8").split("\n");

let cycle = 0;
let op = null;
let i = 0;
let opTime = 0;

let screen = [];
let row = [];

let x = 1;
let spritePos = [x - 1, x, x + 1];

getNextOp();

while (cycle <= 240) {
  // console.log('\n');
  // let spriteStr = "";
  // for (let i = 0; i < 40; i++) {
  //   if (spritePos.includes(i)) {
  //     spriteStr += "#";
  //   } else {
  //     spriteStr += ".";
  //   }
  // }
  // console.log('sprite: ')
  // console.log(spriteStr)


  if(cycle % 40 === 0){
    screen.push(row);
    row = [];
  }
  cycle += 1;
  if(spritePos.includes((cycle - 1) % 40)){
    row.push("#")
  }else{
    row.push(".")
  }
  // console.log("start cycle", cycle)
  // console.log(row.join(""))


  if (op.substring(0, 4) === "noop") {
    getNextOp();
  } else if (op.substring(0, 4) === "addx") {
    if(spritePos.includes(cycle % 40)){

    }
    opTime += 1;
    if (opTime === 2) {
      x += +op.substring(5);
      getNextOp();
    }
  }

  // console.log("Register X is now" , x)
  spritePos = [x - 1, x, x + 1];
}

function getNextOp() {
  op = input[i];
  if(op === undefined){
    op = "noop"
  }
  i += 1;
  if (op.substring(0, 4) === "addx") {
    opTime = 0;
  }
}

function print(){
  screen.forEach(el => console.log(el.join('')))
}

print();
console.log("\n")