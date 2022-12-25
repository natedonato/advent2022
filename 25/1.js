const fs = require("fs");
let input = fs.readFileSync("25/input.txt", "utf-8").split("\n");
let total = 0;

function desnafu(snafu1){
  snafu = snafu1.split('').reverse();
  let placeValue = 1;
  let sum = 0;
  for(let i = 0; i < snafu.length; i++){
    let digit = snafu[i]
    if(digit === '-'){
      digit = -1;
    }else if(digit === '='){
      digit = -2;
    }
    sum += digit * placeValue;
    placeValue *= 5;
  }

  total += sum;

  return sum;
}
for(let snafu of input){
  desnafu(snafu)
};

console.log('total', total);
console.log('snafu', snafuize(total));


function snafuize(num){
  let r = num % 5;
  let d = Math.floor(num / 5);
  if(num === 0){
    return ''
  }
  if(r < 3){
    return snafuize(d) + r.toString();;
  }else if(r === 3){
    return snafuize(1+d) + '='
  }else if(r === 4){
    return snafuize(1+d) + '-'
  }
}