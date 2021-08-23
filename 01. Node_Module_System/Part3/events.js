// Event is a signal that something has happened
// HTTP Module이 요청을 받으면 Event를 발생시킨다.
const EventEmitter = require("events");
const emitter = new EventEmitter();

// EventEmitter is a class

// 순서 중요
// Register a listener
emitter.on("messageLogged", function () {
  console.log("Listener called");
});

// Raise an Event - Making a noise, produce - signalling
emitter.emit("messageLogged", 1, "u");
