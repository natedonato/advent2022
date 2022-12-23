const fs = require("fs");
let input = fs.readFileSync("./19/sample.txt", "utf8").split("\n");

// parse input into costs.
// orebot cost (in ore)
// orebot cost (in ore)
// obsidian bot cost (in [ore, clay])
// geode bot cost in [ore, null, obsidian]
function parseInput(line) {
  // let blueprintNumber = +line.substring(10).split(':')[0];
  let oreBotCost = +line.split("Each ore robot costs ")[1].split(" ore.")[0];
  let clayBotCost = +line.split("Each clay robot costs ")[1].split(" ore.")[0];
  let obsidianBotCost = line
    .split("Each obsidian robot costs ")[1]
    .split(" ore and ");
  obsidianBotCost = [
    +obsidianBotCost[0],
    +obsidianBotCost[1].split(" clay")[0],
  ];
  let geodeBotCost = line
    .split("Each geode robot costs ")[1]
    .split(" ore and ");
  geodeBotCost = [+geodeBotCost[0], 0, +geodeBotCost[1].split(" obsidian")[0]];

  return { oreBotCost, clayBotCost, obsidianBotCost, geodeBotCost };
}
let currentBest = 0;

function simulate(i) {
  let costs = parseInput(input[i]);
  let maxOreCost = Math.max(
    costs.oreBotCost,
    costs.clayBotCost,
    costs.obsidianBotCost[0],
    costs.geodeBotCost[0]
  );
  let maxClayCost = costs.obsidianBotCost[1];
  let maxObsidianCost = costs.geodeBotCost[2];

  // console.log(costs);
  // console.log("max ore cost", maxOreCost);
  // console.log("max clay cost", maxClayCost);
  // console.log("max obsidian cost", maxObsidianCost);

  // ore, clay, obsidian, geode
  // let resources = {ore: 0, clay: 0, obsidian: 0, geodes: 0};
  let resources = [0, 0, 0, 0];
  let bots = [1, 0, 0, 0];
  // let bots = {oreBots: 1, clayBots: 0, obsidianBots: 0, geodeBots: 0};
  let minute = 0;

  let passed = [0, 0, 0, 0];
  let queue = [[resources, bots, minute, passed]];
  let best = 0;

  while (queue.length > 0) {
    let [resources, bots, minute, passed] = queue.shift();

    // current minute
    minute += 1;
    // console.log("minute", minute);
    // console.log("bots", bots);

    let buildableResources = [...resources];
    // console.log("buildable resources", buildableResources);

    // gain next round resources
    for (let i = 0; i < 4; i++) {
      resources[i] += bots[i];
    }

    best = Math.max(best, resources[3]);

    // console.log("total resources", resources);

    if (minute < 32) {
      if (maxPossibleGeode(minute, resources[3], bots[3]) >= best) {
        // build orebot
        if (
          !passed[0] === true &&
          bots[0] < maxOreCost &&
          buildableResources[0] >= costs.oreBotCost
        ) {
          passed[0] = true;
          let nextResources = [...resources];
          nextResources[0] -= costs.oreBotCost;
          let nextBots = [...bots];
          nextBots[0] += 1;

          queue.push([nextResources, nextBots, minute, [0, 0, 0, 0]]);
        }

        // build clayBot
        if (
          !passed[1] === true &&
          bots[1] < maxClayCost &&
          buildableResources[0] >= costs.clayBotCost
        ) {
          passed[1] = true;
          let nextResources = [...resources];
          nextResources[0] -= costs.clayBotCost;
          let nextBots = [...bots];
          nextBots[1] += 1;

          queue.push([nextResources, nextBots, minute, [0, 0, 0, 0]]);
        }

        // build obsidianBot
        if (
          !passed[2] === true &&
          bots[2] < maxObsidianCost &&
          buildableResources[0] >= costs.obsidianBotCost[0] &&
          buildableResources[1] >= costs.obsidianBotCost[1]
        ) {
          passed[2] = true;
          let nextResources = [...resources];
          nextResources[0] -= costs.obsidianBotCost[0];
          nextResources[1] -= costs.obsidianBotCost[1];
          let nextBots = [...bots];
          nextBots[2] += 1;

          queue.push([nextResources, nextBots, minute, [0, 0, 0, 0]]);
        }

        // build geodeBot
        if (
          !passed[3] === true &&
          buildableResources[0] >= costs.geodeBotCost[0] &&
          buildableResources[2] >= costs.geodeBotCost[2]
        ) {
          let nextResources = [...resources];
          nextResources[0] -= costs.geodeBotCost[0];
          nextResources[2] -= costs.geodeBotCost[2];
          let nextBots = [...bots];
          nextBots[3] += 1;

          queue.push([nextResources, nextBots, minute, [0, 0, 0, 0]]);
        }

        // keep mining without building
        queue.push([resources, bots, minute, passed]);
      }
    }
    // end at minute 24
    if (minute === 32) {
      // if (resources[3] > best) {
      //   best = resources[3];
      //   console.log("new best");
      //   console.log(best);
      //   console.log(bots);
      // }
    }
  }
  return best;
}

function maxPossibleGeode(minute, currentGeode, currentGeodeBots) {
  let remaining = 24 - minute;

  while (remaining > 0) {
    currentGeode += currentGeodeBots;
    currentGeodeBots += 1;
    remaining -= 1;
  }

  return currentGeode;
}

let scores = [];

for (let i = 0; i < 3; i++) {
  console.log("simulating", i + 1);
  let score = simulate(i);
  currentBest = Math.max(currentBest, score);
  console.log("round score", score);
  scores.push(score);
}

console.log("total score product", scores[0] * scores[1] * scores[2]);
