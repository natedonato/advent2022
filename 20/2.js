const fs = require("fs");
let input = fs
  .readFileSync("20/input.txt", "utf-8")
  .split("\n")
  .map((el) => +el);

// collect references to nodes
let pointers = {};
let zero;

function node(val, prev, next, i) {
  let node = {
    val: val * 811589153,
    prev: prev,
    next: next,
  };
  pointers[i] = node;

  if (val === 0) {
    zero = node;
  }
  return node;
}

let root = node(input[0], null, null, 0);
pointers[0] = root;
let currentNode = root;
for (let i = 1; i < input.length; i++) {
  let nextNode = node(input[i], currentNode, null, i);
  pointers[i] = nextNode;
  currentNode.next = nextNode;
  currentNode = nextNode;
}
root.prev = currentNode;
currentNode.next = root;

for (let i = 0; i < 10; i++) {
  for (let i = 0; i < Object.keys(pointers).length; i++) {
    let currentNode = pointers[i];
    let traveler = currentNode;
    let val = currentNode.val;
    val %= Object.keys(pointers).length - 1;

    if (currentNode.val !== 0) {
      removeNode(currentNode);
    }

    if (val > 0) {
      for (let i = 0; i < val; i++) {
        traveler = traveler.next;
      }
      insertAfter(currentNode, traveler);
    } else if (val < 0) {
      for (let i = 0; i >= val; i--) {
        traveler = traveler.prev;
      }
      insertAfter(currentNode, traveler);
    }
    // print();
  }
}

function removeNode(node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
  return node;
}

function insertAfter(insert, node) {
  let next = node.next;
  node.next = insert;
  next.prev = insert;
  insert.next = next;
  insert.prev = node;
}

print();

function print() {
  let node = zero;
  let revNode = zero;
  let str = "";
  let strRev = [];
  for (let i = 0; i < input.length; i++) {
    str += node.val + ", ";
    strRev.push(revNode.val);
    node = node.next;
    revNode = revNode.prev;
  }

  strRev.push(strRev.shift());
  strRev = strRev.reverse().join(", ") + ", ";
  if (str !== strRev) {
    console.log("NOT SAME BACK AND FORWARDS! :(");
    console.log(str);
    console.log(strRev);
  } else {
    console.log(str);
    console.log("same back and forward! :)");
  }
}

function getVal(x) {
  let node = zero;
  for (let i = 0; i < x; i++) {
    node = node.next;
  }
  console.log("val at", x, "is", node.val);

  return node.val;
}

console.log("sum", getVal(1000) + getVal(2000) + getVal(3000));
