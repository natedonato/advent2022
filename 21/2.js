const fs = require("fs");
let input = fs.readFileSync("21/input.txt", "utf-8").split("\n");

let ogVals = {};
let ogTbd = {};


for (const line of input) {
  let [monkey, eval] = line.split(": ");
  if (!isNaN(+eval)) {
    ogVals[monkey] = +eval;
  } else {
    ogTbd[monkey] = eval;
  }
}


// takes a human number, tests if values are equal or not
function testEquality(x){
  let vals = {...ogVals};
  let tbd = {...ogTbd};
  vals["humn"] = x;

  let [a, _, b] = ogTbd["root"].split(" ");  
  return makeEval(a) - makeEval(b);
  
  function makeEval(monkey) {
    if (vals[monkey] !== undefined) {
      return vals[monkey];
    }
    let formula = tbd[monkey].split(" ");
    if (formula[1] === "+") {
      vals[monkey] = makeEval(formula[0]) + makeEval(formula[2]);
      return vals[monkey];
    } else if (formula[1] === "-") {
      vals[monkey] = makeEval(formula[0]) - makeEval(formula[2]);
      return vals[monkey];
    } else if (formula[1] === "/") {
      vals[monkey] = makeEval(formula[0]) / makeEval(formula[2]);
      return vals[monkey];
    } else if (formula[1] === "*") {
      vals[monkey] = makeEval(formula[0]) * makeEval(formula[2]);
      return vals[monkey];
    }
  }
}



// console.log(testEquality(1000000000000));
// console.log(testEquality(10000000000000));
// from hand testing
// answer lies between 1000000000000 and 10000000000000
// if test is negative, our shout value is too high
// if test is positive, our shout value is too low


// bsearch for the right thing to shout
let l = 1000000000000;
let r = 10000000000000;
let searching = true;
while(searching){
  let mid = Math.floor((r - l) / 2 ) + l;
  let val = testEquality(mid);

  if(val === 0){
    searching = false;
    console.log("human shouts", mid);
  }else if (val < 0){
    r = mid - 1
  }else{
    l = mid;
  }
}
