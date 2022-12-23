const fs = require("fs");
let input = fs.readFileSync("./16/input.txt", "utf8").split("\n");

let graph = {};
for (const line of input) {
  let valve = line.substring(6, 8);
  let [rate, children] = line.substring(23).split("; tunnels lead to valves ");
  if (children === undefined) {
    [rate, children] = line.substring(23).split("; tunnel leads to valve ");
  }
  children = children.split(", ");
  graph[valve] = { valve, rate: +rate, children };
}

// console.log(graph)

// console.log(calculateShortestPath('JJ', 'DD'))
let results = [];
// find time to move to AND OPEN next valve
function calculateShortestPath(valveA, valveB) {
  let root = graph[valveA];
  let visited = new Set();
  visited.add(valveA);

  let queue = [[root, 1]];
  while (queue.length > 0) {
    let [currentNode, length] = queue.shift();
    // console.log(currentNode, length)
    length += 1;
    for (const child of currentNode.children) {
      if (!visited.has(child)) {
        if (child === valveB) {
          return length;
        } else {
          visited.add(child);
          queue.push([graph[child], length]);
        }
      }
    }
  }
}

// time to travel and open child valve
let paths = {};

for (const node of Object.keys(graph)) {
  // console.log(node)
  if (node === "AA" || graph[node].rate > 0) {
    paths[node] = [];
    for (const node2 of Object.keys(graph)) {
      if (node2 !== node && graph[node2].rate > 0) {
        paths[node].push({
          valve: node2,
          dist: calculateShortestPath(node, node2),
        });
      }
    }
  }
}

console.log(paths);

let currentNode = ["AA", [], 0, 0, 0];
let queue = [currentNode];
let best = 0;


let bestResults = {};

while (queue.length > 0) {
  let [valve, openValves, released, minute, releasingRate] = queue.shift();

  // update gas release rate with current valve
  releasingRate += graph[valve].rate;
  let remainingTime = 26 - minute;

  // travel to other valves and release gas, queue up
  // for each child
  // if travel time less than remaining time
  // queue up traveled version
  let children = paths[valve].filter(
    (el) => !openValves.includes(el.valve) && remainingTime >= el.dist
  );
  children.forEach((child) => {
    let newlyReleased = child.dist * releasingRate;
    queue.push([
      child.valve,
      [...openValves, child.valve],
      released + newlyReleased,
      minute + child.dist,
      releasingRate,
    ]);
  });

  // calculate total released at minute if not traveling
  let final = released + remainingTime * releasingRate;
  let key = openValves.sort().join(',');


  if(key.length > 0 && bestResults[key] === undefined || bestResults[key] < final){
    bestResults[key] = final;
  }

  // results.push([final, openValves.sort()]);
  // console.log(results);
}


console.log(bestResults);
console.log("total results", Object.keys(bestResults).length);

for(const [key, val] of Object.entries(bestResults)){
  

  for(let [key2, val2] of Object.entries(bestResults)){
    // console.log(key2, val2);
    key2 = key2.split(',')
    if(!key.split(',').some(el => key2.includes(el))){
      let totalScore = val + val2;
      best = Math.max(totalScore, best);
      
    }
  }
}


console.log("best score", best);
