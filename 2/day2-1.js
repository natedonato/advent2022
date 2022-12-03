const fs = require("fs");
let input = fs.readFileSync("./2/input.txt", "utf8");

//a - rock
//b - paper
//c - scissors

//x - rock
//y - paper
//z - scissors

const translateSignA = (sign) => {
  const dict = {
    A: "R",
    B: "P",
    C: "S",
  };
  return dict[sign];
};

const translateSignB = (sign) => {
  const dict = {
    X: "R",
    Y: "P",
    Z: "S",
  };
  return dict[sign];
};

const getOutcome = (sign1, sign2) => {
  if (sign1 === sign2) {
    return "tie";
  }
  if (sign1 === "R" && sign2 === "P") {
    return "win";
  }
  if (sign1 === "P" && sign2 === "S") {
    return "win";
  }
  if (sign1 === "S" && sign2 === "R") {
    return "win";
  }
  return "loss";
};

let score = 0;

const getScore = (outcome, thrownSign) => {
  const signScores = {
    R: 1,
    P: 2,
    S: 3,
  };
  const outcomeScores = {
    win: 6,
    loss: 0,
    tie: 3,
  };
  return signScores[thrownSign] + outcomeScores[outcome];
};

const scoreRound = (round) => {
  let [signA, signB] = round.split(" ");
  signA = translateSignA(signA);
  signB = translateSignB(signB);
  let outcome = getOutcome(signA, signB);
  return getScore(outcome, signB);
};

input.split("\n").map((round) => {
  let roundScore = scoreRound(round);
  score += roundScore;
});

console.log(score);
