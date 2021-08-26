## JSON 데이터를 추가하는 방법
```javascript
$ npm init -y
$ npm install yargs
```

```javascript
// app.js
const yargs = require("yargs");
const notes = require("./notes");

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
    notes.addNote(argv.title, argv.body);
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

// notes.js
const fs = require("fs");

const getNotes = function() {
    return "Your notes...";
}

const fs = require("fs");

const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNote(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

const saveNote = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
};

// 실행 결과
$ node app.js add --title="Note Taking" --body="Let's test Note Taking"
New note added!

// notes.json
[
    {"title":"Note Taking","body":"Let's test Note Taking"}
]

// 동일한 명령어로 재실행을 한다면, title 값이 동일하기 때문에 'Note title taken'이라고 표시 되고, json 파일은 업데이트 되지 않은 것을 확인할 수 있다.
```

