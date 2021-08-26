const fs = require("fs");
const chalk = require("chalk");

const addNote = function (title, body) {
  // 추가 add 명령어의 옵션 title과 body를 받아서 처리한다.
  const notes = loadNotes(); // 모든 노트를 로드한다 (Caching).
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title; // title이 동일한 note를 찾는다.
  });

  if (duplicateNotes.length === 0) {
    // title이 동일한 노트가 없을 경우, 추가한다.
    notes.push({
      // note object에 새로운 값을 추가한다.
      title: title,
      body: body,
    });
    saveNotes(notes); // 추가된 note를 저장한다.
    console.log(chalk.green.inverse("New note added!")); // 콘솔에 로그를 남긴다.
  } else {
    console.log(chalk.red.inverse("Note title taken!")); // 콘손에 로그를 남긴다.
  }
};

const removeNote = function (title) {
  // 삭제 remove 명령어의 인자 title을 받아 처리한다.
  const notes = loadNotes(); // 모든 노트를 로드한다 (Caching).
  const notesToKeep = notes.filter(function (note) {
    // title과 동일하지 않은 노트를 남긴다
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    // 남겨진 노트가 기존 노트 개수보다 적다면
    console.log(chalk.green.inverse("Note removed!")); // 삭제되었다고 콘솔에 로그를 남긴다.
  } else {
    // 동일하다면 해당 노트를 찾을 수 없다고 콘솔에 로그를 남긴다.
    console.log(chalk.red.inverse("No note found!"));
  }

  saveNotes(notesToKeep); // 남겨진 노트를 저장한다.
};

const listNotes = () => {
  // 리스트 list 명령어를 받아서 처리한다.
  const notes = loadNotes(); // 모든 노트를 로드한다 (Caching).

  console.log(chalk.inverse("Your notes")); // 콘솔에 로그를 남긴다.

  console.log(notes);

  notes.forEach((note) => {
    // 모든 노트의 각 note의 title을 콘솔에 로그로 남긴다.
    console.log(note.title);
  });
};

const readNote = (title) => {
  // 읽기 read 명령어의 인자 title을 받아서 처리한다.
  const notes = loadNotes(); // 모든 노트를 로드한다 (Caching).
  const note = notes.find((note) => note.title === title); // 옵션으로 받은 title과 동일한 노트가 존재하는지 확인.

  if (note) {
    console.log(chalk.inverse(note.title)); // 있다면 콘솔에 제목을 출력.
    console.log(note.body); // 콘솔에 내용을 출력.
  } else {
    console.log(chalk.red.inverse("Note not found!")); // 없다면, 노트를 찾을 수 없다고 로그에 남기기.
  }
};

const saveNotes = function (notes) {
  // 저장 노트
  const dataJSON = JSON.stringify(notes); // 16진수 코드를 문자열로 변환한다.
  fs.writeFileSync("notes.json", dataJSON); // 파일을 저장한다.
};

const loadNotes = function () {
  // 노트를 로드한다.
  try {
    const dataBuffer = fs.readFileSync("notes.json"); // 16진수 코드로 노트를 불러온다.
    const dataJSON = dataBuffer.toString(); // 문자열로 변환한다.
    return JSON.parse(dataJSON); // object의 parameter를 반환할 수 있도록 리턴한다.
  } catch (e) {
    return [];
  }
};

module.exports = {
  // app.js에서 사용할 수 있게 한다.
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
