const fs = require("fs");

// Avoid using synchronous access, always use async
const files = fs.readdirSync("./");
console.log(files);

fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});

// Occur Error
fs.readdir("$", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});
