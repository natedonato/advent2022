// store data in a tree?
//
// node: parentDir, childrenDirs, files
// ls: populate current node contents
// cd: "x" navigate to child X node
// cd .. navigate to parent node

function createNode(dirName, parent) {
  return {
    name: dirName,
    children: [],
    files: [],
    parent: parent,
    size: undefined,
  };
}

const fs = require("fs");
let input = fs.readFileSync("./7/input.txt", "utf8").split("\n");

// set up root directory node
let i = 1;
let root = createNode("/", null);
let currentDir = root;

// populate full file tree
while (i < input.length) {
  let line = input[i];
  if (line.substring(2, 4) === "ls") {
    // lists contents. add each content item to current directory node
    i += 1;

    while (i < input.length && input[i].charAt(0) !== "$") {
      if (input[i].substring(0, 3) === "dir") {
        // add new child dir to current dir
        let dirName = input[i].split(" ")[1];
        currentDir.children.push(createNode(dirName, currentDir));
      } else {
        //add file to current dir
        let [fileSize, fileName] = input[i].split(" ");
        currentDir.files.push({ name: fileName, size: fileSize });
      }
      i += 1;
    }
  } else if (line.substring(2, 4) === "cd") {
    if (line.substring(5, 7) === "..") {
      // move to parent directory
      currentDir = currentDir.parent;
    } else {
      // move to child directory
      let dirName = line.split(" ")[2];
      let nextDir = currentDir.children.find((el) => el.name === dirName);
      currentDir = nextDir;
    }
    i += 1;
  } else {
    console.log("unknown command", line);
    break;
  }
}

// collect all directory sizes
let allSizes = [];

// recursively calculate directory sizes
function calculateDirSize(dir) {
  let size = 0;

  // add all the included file sizes
  dir.files.forEach((file) => (size += +file.size));

  // add the child file sizes recursively
  dir.children.forEach((child) => {
    if (child.size === undefined) {
      size += calculateDirSize(child);
    } else {
      size += child.size;
    }
  });

  dir.size = size;
  allSizes.push(size);
  return size;
}

let totalSize = calculateDirSize(root);

console.log(totalSize);
// calculate how much size needed to free up
let neededSpace = 30000000 - (70000000 - totalSize);
console.log("space to be freed up:", neededSpace);

// sort all sizes ascending
allSizes = allSizes.sort((a, b) => a - b);

// find the smallest size directory that can be deleted
console.log(allSizes.find((size) => size >= neededSpace));

// pretty print the directories and sizes
// function printSizes(dir, depth) {
//   let s = "";
//   for (let i = 0; i < depth; i++) {
//     s += "  ";
//   }
//   console.log(s + dir.name + " - " + dir.size);
//   dir.children.forEach((child) => {
//     printSizes(child, depth + 1);
//   });
// }

// printSizes(root, 0);
