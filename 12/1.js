// parse input & construct grid

const fs = require("fs");
let input = fs.readFileSync("./12/input.txt", "utf8").split("\n").map(el => el.split(''));

function find(char){
  for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[0].length; j++){
      if(input[i][j] === char){
        return [i,j];
      }
    }
  }
}

// find start & end points
let start = find("S");
let end = find("E");

console.log(start, end)

// set start and end to relative heights
input[start[0]][start[1]] = "a";
input[end[0]][end[1]] = "z";

console.log(input)

let h = "abcdefghijklmnopqrstuvwxyz"

let visited = { };

function getNeighbors(i,j, steps){
  let currentHeight = input[i][j];

  let pairs = [
      [i+1, j],
      [i-1, j],
      [i, j+1],
      [i, j-1]
  ]
  let neighbors = [];
  for(const coord of pairs){
    if(coord[0] < 0 || coord[0] >= input.length || coord[1] < 0 || coord[1] >= input[0].length){
      // do nothing
    }else{
      neighbors.push(coord);
    }
  }

  neighbors = neighbors.filter(el => {
    let nextHeight = input[el[0]][el[1]];
      return (h.indexOf(currentHeight) + 1 >= h.indexOf(nextHeight))
    }
  )

  neighbors = neighbors.filter((el) => {
    let str = `${el[0]},${el[1]}`;
    if (visited[str] !== undefined) {
      return false;
    } else {
      visited[str] = steps;
      return true;
    }
  });

  return neighbors
}

let queue = [ [...start, 0]];

let goalSteps;

while(queue.length > 0){
  
  let next = queue.shift();
  let x = next[0];
  let y = next[1];
  let steps = next[2];

  if(end[0] === x && end[1] === y){
    goalSteps = steps;
    console.log(goalSteps)
    break;
  }

  let neighbors = getNeighbors(x,y, steps + 1);

  neighbors.forEach(node => queue.push([...node, steps + 1]))
}

console.log(goalSteps)