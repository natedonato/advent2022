const fs = require('fs');
let input = fs.readFileSync('20/input.txt', "utf-8").split('\n').map(el => +el);

console.log(input.length);

// collect references to nodes
let pointers = {};
let zero;

function node(val, prev, next, i){
  let node = {
    val: val,
    prev: prev,
    next: next
  };
  pointers[i] = node;

  if(val === 0){
    zero = node;
  }
  return(node)
}

// make double linked list
let root = node(input[0], null, null, 0)
let prev = root;
for(let i = 1; i < input.length; i++){
  let nextNode = node(input[i], prev, null, i);
  prev.next = nextNode;
  prev = nextNode;
};
root.prev = prev;
prev.next = root;

console.log(Object.keys(pointers).length)

for(let i = 0; i < input.length; i++){
  let currentNode = pointers[i];
  let number = currentNode.val;
  let point = currentNode;
  let turns = number % input.length;

  if(turns > 0){
    for(let i = 0; i < turns; i++){
      point = point.next;
    }
  }else{
    for(let i = 0; i > turns; i--){
      point = point.prev;
    }
    point = point.prev;
  }

  if(turns !== 0){
    removeEl(currentNode);
    insertAfter(currentNode, point);
  }
  // print(0)
};


function print(val){
  let p = zero;
  let str = ""
  for(let i = 0; i < input.length; i++){
    str += p.val + ', ';
    p = p.next;
    if(p.val === 0){
      console.log(i)
    }
  }
}


console.log(zero);

function printRev(val){
  let p = zero;
  let arr = [];
  for (let i = 0; i < input.length; i++) {
    arr.push(p.val)
    p = p.prev;
  }

  arr.push(arr.shift())
  // console.log(arr.reverse().join(", "))  
  // return arr.reverse().join(", ");
}


function removeEl(node) {
  let prev = node.prev;
  let next = node.next;
  prev.next = next;
  next.prev = prev;
  node.prev = null;
  node.next = null;

  return node;
}

// insert nodeA after nodeB
function insertAfter(nodeA, nodeB) {
  let next = nodeB.next;

  nodeA.next = next;
  next.prev = nodeA;

  nodeB.next = nodeA;
  nodeA.prev = nodeB;
}

function findNodeNum(num){
  num %= input.length;
  let node = zero
  for(let i = 0; i < num; i++){
    node = node.next;
  }

  console.log('after', num, "val=", node.val);
  return node.val;
}

print(0)
printRev(0)


console.log(findNodeNum(1000) + findNodeNum(2000) + findNodeNum(3000))