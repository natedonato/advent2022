const fs = require('fs');
let input = fs.readFileSync('21/input.txt', "utf-8").split('\n');

let vals = {};
let tbd = {};

for(const line of input){
  let [monkey, eval] = line.split(": ");
  if(!isNaN(+eval)){
    vals[monkey] = +eval;
  }else{
    tbd[monkey] = eval;
  }
}

function makeEval(monkey){
  if(vals[monkey] !== undefined){
    return vals[monkey]
  }

  let formula = tbd[monkey].split(" ");
  if(formula[1] === "+"){
    vals[monkey] = makeEval(formula[0]) + makeEval(formula[2]);
    return vals[monkey]
  }else if(formula[1] === "-"){
    vals[monkey] = makeEval(formula[0]) - makeEval(formula[2]);
    return vals[monkey]
  }else if(formula[1] === "/"){
    vals[monkey] = makeEval(formula[0]) / makeEval(formula[2]);
    return vals[monkey]
  }else if(formula[1] === "*"){
    vals[monkey] = makeEval(formula[0]) * makeEval(formula[2]);
    return vals[monkey]
  }
}


console.log(makeEval("root"))