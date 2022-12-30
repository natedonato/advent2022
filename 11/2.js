const fs = require("fs");
let input = fs
  .readFileSync("./11/input.txt", "utf8")
  .split("\n\n")
  .map((el) => el.split("\n"));

// parse input monkeys into important values
function makeMonkey(monkeyStr) {
  let name = +monkeyStr[0].substring(7, monkeyStr[0].length - 1);
  let items = monkeyStr[1]
    .substring(18)
    .split(", ")
    .map((el) => +el);
  let operation = monkeyStr[2].substring(19);
  let divisor = +monkeyStr[3].substring(21);
  let trueTarget = +monkeyStr[4].substring(29);
  let falseTarget = +monkeyStr[5].substring(30);

  return {
    name: name,
    items: items,
    operation: operation,
    divisor: divisor,
    trueTarget: trueTarget,
    falseTarget: falseTarget,
    numTimesInspected: 0,
  };
}

let monkeys = [];

// make monkey objects from input
for (const monkeyStr of input) {
  monkeys.push(makeMonkey(monkeyStr));
}

// make common divisor to reduce worry level
let cd = monkeys.reduce((acc, el) => el.divisor * acc, 1);

for (let i = 0; i < 10000; i++) {
  for (const monkey of monkeys) {
    takeTurn(monkey);
  }
}

function takeTurn(monkey) {
  // inspect each of monkey's item
  // increment inspection number
  // apply operation to item

  // reduce worry level by "common divisor"?

  // test if divisble by divisor
  //  if true, give item to true target monkey
  //  if false, give item to false target monkey

  for (let item of monkey.items) {
    monkey.numTimesInspected += 1;
    let old = item;
    item = eval(monkey.operation);

    item = item % cd;

    if (item % monkey.divisor === 0) {
      monkeys.find((el) => el.name === monkey.trueTarget).items.push(item);
    } else {
      monkeys.find((el) => el.name === monkey.falseTarget).items.push(item);
    }
  }

  monkey.items = [];
}

monkeys = monkeys.sort((a, b) => b.numTimesInspected - a.numTimesInspected);

console.log(monkeys);

console.log(
  "total level of monkey business:",
  monkeys[0].numTimesInspected * monkeys[1].numTimesInspected
);
