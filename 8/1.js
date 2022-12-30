const fs = require("fs");
let input = fs.readFileSync("./8/input.txt", "utf8").split("\n");
input = input.map((line) => line.split(""));
input = input.map((row) => row.map((el) => +el));
prettyPrint(input);

let copy = [];
for (let i = 0; i < input.length; i++) {
  copy[i] = [...input[i]];
}

for (let i = 0; i < input.length; i++) {
  markVisibleRow(i);
}

for (let j = 0; j < input[0].length; j++) {
  markVisibleCol(j);
}

function markVisibleRow(rowNum) {
  let row = input[rowNum];

  copy[rowNum][0] = "X";
  copy[rowNum][row.length - 1] = "X";

  //left
  let max = row[0];
  for (let i = 1; i < row.length - 1; i++) {
    if (row[i] > max) {
      copy[rowNum][i] = "X";
      max = row[i];
    }
  }

  // right
  max = row[row.length - 1];
  for (let i = row.length - 2; i > 0; i--) {
    if (row[i] > max) {
      copy[rowNum][i] = "X";
      max = row[i];
    }
  }
}

function markVisibleCol(colNum) {
  copy[0][colNum] = "X";
  copy[input.length - 1][colNum] = "X";

  //top
  let max = input[0][colNum];
  for (let i = 1; i < input[0].length - 1; i++) {
    if (input[i][colNum] > max) {
      copy[i][colNum] = "X";
      max = input[i][colNum];
    }
  }

  // bottom
  max = input[input.length - 1][colNum];
  for (let i = input[0].length - 2; i > 0; i--) {
    if (input[i][colNum] > max) {
      copy[i][colNum] = "X";
      max = input[i][colNum];
    }
  }
}

prettyPrint(copy);

// count visible
let total = 0;
for (let i = 0; i < copy.length; i++) {
  for (let j = 0; j < copy[0].length; j++) {
    if (copy[i][j] === "X") {
      total += 1;
    }
  }
}

console.log("total visible:", total);

function prettyPrint(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].join(""));
  }
}
