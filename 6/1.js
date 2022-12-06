const fs = require("fs");
let input = fs.readFileSync("./6/input.txt", "utf8").split('');

let found = false;
let i = 0;
while(found === false){
  
  let sub = input.slice(i, i+4);
  // console.log(i, sub)

  if(unique(sub)){
    found = true;
  }else{
    i += 1;
  }
}

console.log(i+4)

function unique(arr){
  return arr.filter((el, idx) => arr.indexOf(el) === idx).length === arr.length;
}