"use strict";

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  rl.question(
    "Choose mode\n1) Interactive mode\n2) File mode\nAny other key - exit\n",
    function (mode) {
      if (mode === "1") interactiveFunc();
      else if (mode === "2") notInteractiveFunc();
      else {
        console.log("Program stopped");
        rl.close();
      }
    }
  );
};

const interactiveFunc = async () => {
  console.log("Quadratic equation instance: ax^2 + bx + c = 0");
  const a = await questionFunc("a");
  const b = await questionFunc("b");
  const c = await questionFunc("c");
  console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
  const roots = solveQuadraticEquation(a, b, c);
  console.log(roots);
  showMenu();
};

const notInteractiveFunc = async () => {
  console.log("Quadratic equation instance: ax^2 + bx + c = 0");
  rl.question(
    `Write name of txt file with variables. 
Instance: text.txt
This file should contain variables like this: 1 0 0\n`,
    function (filename) {
      if (fs.existsSync(filename)) {
        const regex = /-*\d+[.\d+]* -*\d+[.\d+]* -*\d+[.\d+]*/;
        const fileContent = fs.readFileSync(filename, "utf-8");
        if (regex.test(fileContent)) {
          const numbersStr = fileContent.match(regex)[0];
          const numbersArr = numbersStr.split(" ");
          const [a, b, c] = [
            parseFloat(numbersArr[0]),
            parseFloat(numbersArr[1]),
            parseFloat(numbersArr[2]),
          ];
          if (a == 0) {
            console.log("a can't be equal 0\n");
            showMenu();
            return;
          }
          console.log(`
a =\x1b[32m ${a} \x1b[37m
b =\x1b[32m ${b} \x1b[37m
c =\x1b[32m ${c} \x1b[37m`);
          console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
          const roots = solveQuadraticEquation(a, b, c);
          console.log(roots);
          showMenu();
        }
      } else {
        console.log("There is no such file in this directory");
        showMenu();
      }
    }
  );
};

const questionFunc = async (name) => {
  return new Promise((resolve) => {
    rl.question(
      `Write ${name} (use . to input float number)\n`,
      async function (inp) {
        let res = parseFloat(inp);
        console.log(`${name} =\x1b[32m ${inp} \x1b[37m`);
        if (isNaN(res)) {
          console.log(
            `Error. Expected a valid real number, got ${inp} instead. Please write number...\n`
          );
          resolve(await questionFunc(name));
        } else {
          if (name == "a" && res == 0) {
            console.log("a can't be equal 0. Please write number again...\n");
            resolve(await questionFunc(name));
          }
          resolve(res);
        }
      }
    );
  });
};

const solveQuadraticEquation = (a, b, c) => {
  const result = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  const result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  if (isNaN(result)) return "There are 0 roots\n";
  if (result == result2) return `There is 1 root\nx1 = ${result}\n`;
  return `There are 2 roots
x1 = ${result}
x2 = ${result2}
`;
};

showMenu();
