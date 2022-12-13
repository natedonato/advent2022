const fs = require("fs");
let input = fs.readFileSync("./13/input.txt", "utf8").split("\n\n");

let sum = 0;

for(let i = 1; i <= input.length; i++){
  let pair = input[i - 1]
  let [l, r] = pair.split("\n").map((el) => eval(el));

  // console.log(i)
  let res = compare(l,r)
  if(res === true){
    sum += i;
  }
  // console.log("result", res);

}

console.log(sum)

function compare(left, right){
  // console.log(left,right)
  // compare integers
  if(typeof(left) === "number" && typeof(right) === "number"){
    // console.log('two numbers')
    if(left < right){
      return true;
    }else if(right < left){
      return false;
    }else{
      return null;
    }
  }

  // compare lists
  if(Array.isArray(left) && Array.isArray(right)){
    // console.log("two lists")
    let i = 0;

    while(true){
      if(left[i] === undefined && right[i] === undefined){
        // console.log('both lists ran out same time')
        return null
      }else if(left[i] === undefined && right[i] !== undefined){
        // console.log("right ran out first")
        return true;
      }else if(left[i] !== undefined && right[i] === undefined){
        // console.log("left ran out first")
        return false
      }else if(compare(left[i], right[i]) !== null){
        // console.log('definitive comparisson')
        return compare(left[i], right[i]);
      }
      i += 1;
    }
  }

  // fix missmatch and compare
  if (typeof left !== typeof right) {
    // console.log('missmatched types')
    if (typeof left === "number") {
      left = [left];
    } else {
      right = [right];
    }
    return compare(left, right);
  }

}