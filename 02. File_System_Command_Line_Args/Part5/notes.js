const fs = require("fs");
const chalk = require("chalk"); // console.log 색상 관리 모듈

const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  // 추가 add 명령어의 옵션 title과 body를 받아서 처리한다.
  const notes = loadNotes(); // 노트를 로드한다. (caching)
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
  const notes = loadNotes(); // 노트를 로드한다.
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

const saveNotes = function (notes) {
  // 저장 노트
  const dataJSON = JSON.stringify(notes); // 16진수 코드를 문자열로 변환한다.
  fs.writeFileSync("notes.json", dataJSON); // 파일을 저장한다.
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
};
