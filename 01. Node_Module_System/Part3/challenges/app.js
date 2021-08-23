/*
Challenges: Use the chalk library in your project

1. Install version 2.4.1 of chalks
2. Load chalk into app.js
3. Use it to print the string "Success!" to the console in green
4. Test Your Work

Bonus: Use docs to mess around with other styles,
- Make text bold and inversed
*/

const chalk = require("chalk");

const greenMsg = chalk.green("Success!");
const greenBoldMsg = chalk.green.bold("Bold Success!");
const greenInverseBoldMsg = chalk.green.inverse.bold("Inverse Bold Success!");

console.log(greenMsg);
console.log(greenBoldMsg);
console.log(greenInverseBoldMsg);
