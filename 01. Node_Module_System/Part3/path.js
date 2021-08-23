// Node assumes that it is a built-in modules
const path = require("path");

const pathObj = path.parse(__filename);

console.log(pathObj);
