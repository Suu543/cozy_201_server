## Node.js module.exports

### Modules
```javascript
// Node에서 모든 파일은 module이고 적어도 하나의 module을 가지고있다 이 module 각 파일의 scope에 속한다.
console.log(module)

Module {
  id: '.',
  path: 'C:\\Users\\jos50\\OneDrive\\바탕 화면\\dev\\Realtime_MERN',       
  exports: {},
  parent: null,
  filename: 'C:\\Users\\jos50\\OneDrive\\바탕 화면\\dev\\Realtime_MERN\\app.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\jos50\\OneDrive\\바탕 화면\\dev\\Realtime_MERN\\node_modules',
    'C:\\Users\\jos50\\OneDrive\\바탕 화면\\dev\\node_modules',
    'C:\\Users\\jos50\\OneDrive\\바탕 화면\\node_modules',
    'C:\\Users\\jos50\\OneDrive\\node_modules',
    'C:\\Users\\jos50\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}

```

### Creating a Module
```javascript
// logger.js
const url = 'http://mylogger.io/log';

function log(message) {
    console.log(message);
}

// 이 방식으로 Implementation Detail을 숨길 수 있다. 
// exports는 private을 public으로 만든다 생각할 수 있다.

module.exports.log = log;
module.exports.endPoint = url;
```

### Loading a Module
```javascript
const logger = require("./logger.js");

console.log(logger);

// { log: [Function: log], endPoint: 'http://mylogger.io/log'}
logger.log('message');
console.log(logger.endPoint);
```

### If you want to only export a single function
```javascript
// logger.js
const url = 'http://mylogger.io/log';

function log(message) {
    console.log(message);
}

module.exports = log;

// app.js
// You can name it whatever you want
// Importing Your Own Files
const logger = require("./utils.js");

console.log(logger); // [Function: log]

logger("message"); // message
```
### Version-Two
```javascript
const url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

exports.log = log;

// Importing Your Own Files
const logger = require("./utils.js");

console.log(logger); // { log: [Function: log] }
```

### Module Wrapper Function
`module.exports`는 어떻게 동작할까?
```javascript
// Runtime에서 코드는 아래와 같이 Module Wrapper Function에 의해 쌓여진다 IIFE
(function (exports, require, module, __filename, __dirname) {
    console.log(__filename);
    console.log(__dirname);
    const url = 'http://mylogger.io/log';
    
    function log(message) {
        console.log(message);
    }
    
    module.exports = log; // [Function: log] - Class Constructor를 리턴
    module.exports.log = log; // { log: [Function: log] }
    exports.log = log // { log: [Function: log] }
    
    // Cannot change it like this 왜냐하면 exports는 module.exports를 참조하고 있기 때문에
    // exports = log; 
})
```

### In Detail
1. `require()` 함수는 `module.exports`를 리턴한다.

```javascript
// require 함수를 요약하면 다음과 같다

// 1. 인자를 받아온다
let require = function(src) { 
    // 2. 소스 파일을 읽어 fileAsStr에 저장한다.
    let fileAsStr = fs.readFile(src);
    // 3. module.exports라는 빈 해시를 만들어준다.
    let module.exports = {};
    // 4. fileAsStr을 eval한다. 이는 src를 copy and paste 한다 생각 할 수 있다.
    eval (fileAsStr);
    return module.exports
}

// 4번 과정을 자세히 알아보자
// foo.js
const a = 10;
exports.a = a;

// 1. src의 인자로 './foo.js'를 넣는다.
const foo = require('./foo.js');

let require = function(src) {
    let fileAsStr = fs.readFile(src);
    var module.exports = {};
    const a = 10;
    exports.a = a;
    return module.exports;
}

// bar.js
const foo = require("./foo.js");
console.log(foo.a);

// Runtime에서 bar.js는 다음과 같은 모습을 띈다.
const foo = { a: 10 }
console.log(foo.a)
```

2. exports는 어떻게 동작할까?
- `exports`는 `foo.js` 파일의 특정한 함수를 `bar.js`로 넘겨주고 싶을 때 사용할 수 있다.

다시 `require()`를 알아보자
```javascript
let require = function(src) {
    let fileAsStr = fs.readFile(src);
    let module.exports = {};
    eval(fileAsStr);
    return module.exports
}

// eval 단계
let require = function(src) {
    let fileAsStr = fs.readFile(src);
    let module.exports = {};
    const a = 10;
    exports.a = 10;
    return module.exports
}
```
`eval` 단계에서 트릭이 발생한다. <br>
`exports`와 `module.exports`는 명칭은 다르지만 같은 대상을 지칭하고 있다. 그렇다면 왜 하나만 존재하는 것이 아닌 위와 같이 두 종류가 존재할까?

- 공식 문서에 따르면 `exports`는 단순히 `module.exports`를 참조하는 줄임말(alias or shortcut)이라 소개한다.

`exports`
- A reference to the module.exports that is shorter to type. See the section about the exports shortcut for details on when to useexports and when to use module.exports.
- Node.js v10.6.0 Documentation

- `exports`는 `module.` 7글자를 반복해 작성하지 않기 위해 사용하는 것이라고 한다...
- 개념적 차이가 없다면, 어떻게 잘 사용할 것인지가 문제다.

1. exported value/function을 담는 컨테이너
```javascript
// foo.js

// 아래 두 방식은 똑같이 동작한다
module.exports.foo = "bar";
exports.foo = "bar"

// 함수도 들어갈 수 있다
module.exports.foo = function() { console.log("foo"); }
exports.foo = function() { console.log("foo"); } 

// 아래와 같이 작성은 불가능하다
// exports = { foo: "bar" }
// exports = function() { console.log("foo") }

// exports를 새로 정의하고 싶다면 다음과 같이
// module.exports = exports = function() { console.log("foo")}

// bar.js
const value_func_container = require("./foo.js");

console.log(value_func_container.value1);
console.log(value_func_container.value2);
console.log(value_func_container.value3);
console.log(value_func_container.value4);
console.log(value_func_container.value5);
```

2. constructor function으로 사용하기
```javascript
const express = require("express");
const app = express();
```
- 위 코드는 단순하게 값을 가져오는 것이 아닌, `express`의 `객체(object)`를 생성하는 방식이다.

```javascript
// 추천
module.exports = function() { console.log("foo"); }

// 비추천
// 프로퍼티/함수를 동일한 계층으로 보고 한꺼번에 묶어서 exports하는 것은 납득이 갑니다만, 오브젝트와 프로퍼티 혹은 오브젝트와 함수를 동일한 계층으로 보는 것은 문제가 있다고 보기 때문입니다.

module.exports = function() { console.log("foo"); }
module.exports.one = 1;
```

### Summary
1. `require()`는 `module.exports`를 리턴한다.
2. `exports`는 `module.exports`를 참조한 줄임말(shortcut or alias) 이다.
3. `exports`와 `module.exports`의 용례
- `module.exports = something`은 항상 `class constructor` 하나만 해주기, 그렇지 않다면 직관적이지 않은 문제가 발생한다.
```javascript
// TestCase
module.exports = log;
module.exports.one = "5";
```

- https://medium.com/@vishwa.efor/javascript-module-exports-require-import-export-define-cc04461f4d5e