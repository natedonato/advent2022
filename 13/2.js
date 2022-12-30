const fs = require("fs");
let input = fs
  .readFileSync("./13/input.txt", "utf8")
  .split("\n")
  .filter((el) => el !== "")
  .map((el) => eval(el));
input.push([[2]]);
input.push([[6]]);

// sort by compare fn
input = input.sort((a, b) => (compare(a, b) ? -1 : 1));

// find decoder packets
let dividerA = JSON.stringify([[2]]);
let dividerB = JSON.stringify([[6]]);

let decoder = [];

for (let i = 0; i < input.length; i++) {
  let str = JSON.stringify(input[i]);
  if (str === dividerA || str === dividerB) {
    decoder.push(i + 1);
  }
}

// multiply decoder keys
console.log(decoder[0] * decoder[1]);

function compare(left, right) {
  // compare integers
  if (typeof left === "number" && typeof right === "number") {
    // console.log('two numbers')
    if (left < right) {
      return true;
    } else if (right < left) {
      return false;
    } else {
      return null;
    }
  }

  // compare lists
  if (Array.isArray(left) && Array.isArray(right)) {
    // console.log("two lists")
    let i = 0;

    while (true) {
      if (left[i] === undefined && right[i] === undefined) {
        // console.log('both lists ran out same time')
        return null;
      } else if (left[i] === undefined && right[i] !== undefined) {
        // console.log("right ran out first")
        return true;
      } else if (left[i] !== undefined && right[i] === undefined) {
        // console.log("left ran out first")
        return false;
      } else if (compare(left[i], right[i]) !== null) {
        // console.log('definitive comparisson')
        return compare(left[i], right[i]);
      }
      i += 1;
    }
  }

  // fix missmatch and compare
  if (typeof left !== typeof right) {
    if (typeof left === "number") {
      left = [left];
    } else {
      right = [right];
    }
    return compare(left, right);
  }
}
