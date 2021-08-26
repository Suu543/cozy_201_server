console.log(process.argv);
// [
//   "C:\\Program Files\\nodejs\\node.exe",
//   "C:\\Users\\jos50\\OneDrive\\바탕 화면\\cozy_201_server\\02. File_System_Command_Line_Args\\app.js",
// ];

const command = process.argv[2];

// argv = argument vector (array)
console.log(process.argv);

// node app.js add --title="This is my title"
if (command === "add") {
  console.log("Adding note!");
} else if (command === "remove") {
  console.log("Removing note!");
}
