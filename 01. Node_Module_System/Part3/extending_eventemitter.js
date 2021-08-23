// logger.js
const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);

    // Raise an Event
    // this references Logger itself
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

module.exports = Logger;

// app.js
const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("arg", arg);
});

logger.log("message");
