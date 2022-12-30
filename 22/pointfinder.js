const fs = require("fs");
let input = fs
  .readFileSync("22/input.txt", "utf-8")
  .split("\n")
  .map((el) => el + " ");
input.pop();
input.pop();

let a = process.argv[2].split(",").map((el) => +el);

console.log(a);
function printState() {
  for (let i = 0; i < input.length; i++) {
    let str = "";
    for (let j = 0; j < input[0].length; j++) {
      if (j === a[1] && i === a[0]) {
        str += "X";
      } else {
        if (input[i][j] === undefined) {
          str += " ";
        } else {
          str += input[i][j];
        }
      }
    }
    console.log(str);
  }
}

printState();
