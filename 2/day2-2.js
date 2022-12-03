const fs = require("fs");
let input = fs.readFileSync("./2/input.txt", "utf8").split("\n");

const translateSignA = (sign) => {
  const dict = {
    A: "R",
    B: "P",
    C: "S",
  };
  return dict[sign];
};

const translateDesiredOutcome = (code) => {
  const dict = {
    X: "lose",
    Y: "tie",
    Z: "win",
  };
  return dict[code];
};

const findSign = (sign, outcome) => {
  const winningSigns = {
    R: "P",
    P: "S",
    S: "R",
  };

  const losingSigns = {
    R: "S",
    P: "R",
    S: "P",
  };

  if (outcome === "tie") {
    return sign;
  }
  if (outcome === "win") {
    return winningSigns[sign];
  }
  if (outcome === "lose") {
    return losingSigns[sign];
  }
};

const scoreRound = (round) => {
  let [signA, code] = round.split(" ");
  let sign = translateSignA(signA);
  let outcome = translateDesiredOutcome(code);

  const signScores = {
    R: 1,
    P: 2,
    S: 3,
  };
  const outcomeScores = {
    win: 6,
    lose: 0,
    tie: 3,
  };

  let score = outcomeScores[outcome] + signScores[findSign(sign, outcome)];

  return score;
};

let score = 0;

input.forEach((round) => (score += scoreRound(round)));

console.log(score);
