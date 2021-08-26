```javascript
npm init -y
npm install yargs
```

```javascript
const yargs = require("yargs");

console.log(process.argv);
console.log(yargs.argv);
// node yargs.js
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\jos50\\OneDrive\\바탕 화면\\cozy_201_server\\02. File_System_Command_Line_Args\\Part2\\yargs.js'
// ]
// { _: [], '$0': 'yargs.js' }
```

```javascript
node app.js --title="Hello World"

[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\jos50\\OneDrive\\바탕 화면\\cozy_201_server\\02. File_System_Command_Line_Args\\Part2\\app.js',
  '--title=Hello World'
]
{ _: [], title: 'Hello World', '$0': 'app.js' }
```

```javascript
node app.js --help

[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\jos50\\OneDrive\\바탕 화면\\cozy_201_server\\02. File_System_Command_Line_Args\\Part2\\app.js',
  '--help'
]
옵션:
  --help     도움말을 보여줍니다                        
  --version  버전 넘버를 보여줍니다                    
```

```javascript
node app.js --version

1.1.0
```

#### yargs를 이용해서 버전을 변경해보자
```javascript
const yargs = require("yargs");

yargs.version('1.1.0');

console.log(yargs.argv);
```

#### yargs를 이용해서 4가지 명령어를 세팅해보자
- add, remove, read, list
```javascript
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Add a new thing",
  handler: function () {
    console.log("Adding a new thing!");
  },
});

console.log(yargs.argv);

// 결과

명령:
    app.js add  Add a new thing

옵션:
  --help     도움말을 보여줍니다                                          [여부]
  --version  버전 넘버를 보여줍니다                                       [여부]
```

#### add command 실행
```javascript
node app.js add

Adding a new thing!
{ _: [ 'add' ], '$0': 'test.js' }
```

#### yargs를 사용해서 위 4가지 명령어 세팅
```javascript
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Add a new thing",
  handler: function () {
    console.log("Adding a new thing!");
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

console.log(yargs.argv);
```

#### --help 테스트
```javascript
$ node app.js --help
app.js [명령]

명령:
  app.js add     Add a new thing
  app.js remove  Remove a thing
  app.js list    List a thing
  app.js read    Read a thing

옵션:
  --help     도움말을 보여줍니다                                          [여부]
  --version  버전 넘버를 보여줍니다                                       [여부]
```

#### builder 추가
```javascript
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Add a new thing",
  builder: {
    title: {
      describe: "Thing title",
    },
  },
  handler: function () {
    console.log("Adding a new thing!");
  },
});

console.log(yargs.argv);
```

#### Builder 실행
```javascript
$ node app.js add --title="Hello World"

Adding a new thing!
{ _: [ 'add' ], title: 'Hello World', '$0': 'app.js' }

// --title 부분은 선택적(optional)이기 때문에 명시하지 않아도 동작한다.
$ node app.js add

Adding a new thing!
{ _: [ 'add' ], '$0': 'app.js' }
```

#### title을 필수 요소로 변경
```javascript
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Add a new thing",
  builder: {
    title: {
      describe: "Thing title",
      demandOption: true
    },
  },
  handler: function (argv) {
    console.log("Adding a new thing!", argv);
  },
});

// title 없이 위 파일을 실행시 아래와 같은 오류 발생
$ node app.js add
app.js add

Add a new thing

옵션:
  --help     도움말을 보여줍니다                                          [여부]
  --version  버전 넘버를 보여줍니다                                       [여부]
  --title    Thing title                                                 [필수]

필수 인자를 받지 못했습니다: title


// title에 어떠한 값도 할당하지 않는 경우 기본값으로 true가 설정된다.
$ node app.js add 
Adding a new thing! { _: [ 'add' ], title: true, '$0': 'test.js' }
{ _: [ 'add' ], title: true, '$0': 'test.js' }
```

#### title 형식 지정
```javascript
yargs.command({
  command: "add",
  describe: "Add a new thing",
  builder: {
    title: {
      describe: "Thing title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Adding a new thing!", argv);
  },
});

// 실행 결과
$ node app.js add --title
Adding a new thing! { _: [ 'add' ], title: '', '$0': 'app.js' }
{ _: [ 'add' ], title: '', '$0': 'app.js' }

// title값 지정시
$ node app.js add --title="Hello World"
Adding a new thing! { _: [ 'add' ], title: 'Hello World', '$0': 'app.js' }
{ _: [ 'add' ], title: 'Hello World', '$0': 'app.js' }
```

#### 결과 중복 방지
실행시 아래와 같이 결과가 중복되는 것을 확인할 수 있다. 이를 방지하기 위해서 
`console.log(yargs)`를 `yargs.parse()`로 변경했다.

```javascript
$ node app.js add --title="Hello World"
Adding a new thing! { _: [ 'add' ], title: 'Hello World', '$0': 'app.js' }
{ _: [ 'add' ], title: 'Hello World', '$0': 'app.js' }
```

```javascript
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

// 실행 결과
$ node app.js add --title="Hello World"
Adding a new thing! { _: [ 'add' ], title: 'Hello World', '$0': 'app.js' }
```

#### body 옵션 추가
```javascript
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
    console.log("Title: " + argv.title);
    console.log("Body: " + argv.body);
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

// 실행 결과
$ node app.js add --title="This is a title" --body="This is a body"
Adding a new thing! {      
  _: [ 'add' ],
  title: 'This is a title',
  body: 'This is a body',  
  '$0': 'app.js'
}
```