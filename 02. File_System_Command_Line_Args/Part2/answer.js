const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Add a new thing",
  builder: {
    title: {
      describe: "Thing title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Thing body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Adding a new thing!", argv);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a thing",
  handler: function () {
    console.log("Removing the thing!");
  },
});

yargs.command({
  command: "list",
  describe: "List a thing",
  handler: function () {
    console.log("Listing the thing!");
  },
});

yargs.command({
  command: "read",
  describe: "Read a thing",
  handler: function () {
    console.log("Reading the thing!");
  },
});

yargs.parse();
