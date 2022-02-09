"use strict";

const readline = require("readline");
const fs = require("fs");

/* const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 */
/* rl.question(
  "Choose mode\n1) Interactive mode\n2) File mode\nAny other key - exit\n",
  function (mode) {
    if (mode === "1") interactiveFunc();
    if (mode === "2") console.log("mode 2");
  }
); */

const interactiveFunc = async () => {
  console.log("Quadric equation instance: ax^2 + bx + c = 0");
  const a = await questionFunc("a");
  const b = await questionFunc("b");
  const c = await questionFunc("c");
  console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
};

const questionFunc = async (name) => {
  return new Promise((resolve) => {
    rl.question(
      `Write ${name} (use . to input float number)\n`,
      async function (inp) {
        let res = parseFloat(inp);
        if (isNaN(res)) {
          console.log(
            `Error. Expected a valid real number, got ${inp} instead. Please write number...\n`
          );
          resolve(await questionFunc(name));
        } else {
          resolve(res);
        }
      }
    );
  });
};

const solveQuadricEquation = (a, b, c) => {
  const result = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  const result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  if (isNaN(result)) return "There are 0 roots";
  if (result == result2) return `There is 1 root\nx1 = ${result}`;
  return `There are 2 roots
x1 = ${result}
x2 = ${result2}`;
};

console.log(solveQuadricEquation(1, 4, 5));
