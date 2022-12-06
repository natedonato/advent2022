const fs = require("fs");
let input = fs.readFileSync('./5/input.txt','utf8').split('\n').map(el => el.slice(5));
let stacks = fs.readFileSync("./5/inputm.txt", "utf8").split("\n").map(el => el.split(''))


for(const line of input){
  let [num, rest] = line.split(' from ');
  let [from, to] = rest.split(' to ');
  move(num, from - 1, to - 1);

}


function move(num,from,to){
  for(let i = 0; i < num; i++){
    el = stacks[from].pop();
    stacks[to].push(el);
  }
}

console.log(stacks.map(el => el.join('')))


console.log(stacks.map(el => el.pop()).join(''))