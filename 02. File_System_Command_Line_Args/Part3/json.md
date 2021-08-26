## Storing Data with JSON
Node.js에서 .json 파일에 데이터를 저장하는 방법에 대해서 알아보자.

```javascript
// app.js
const book = {
  title: "Such a beautiful day",
  author: "Su Jeong",
};

const bookJSON = JSON.stringify(book);

console.log(bookJSON);

// 출력 결과
$ node app.js
{"title":"Such a beautiful day","author":"Su Jeong"}
```

#### book object에서 author key에 해당하는 값 추출
```javascript
const book = {
  title: "Such a beautiful day",
  author: "Su Jeong",
};

const bookJSON = JSON.stringify(book);
const parsedData = JSON.parse(bookJSON);

console.log(parsedData.author);

// 출력 결과
$ node app.js
Su Jeong
```

#### fs module을 활용한 json 파일 생성
```javascript
const fs = require("fs");

const book = {
  title: "Such a beautiful day",
  author: "Su Jeong",
};

const bookJSON = JSON.stringify(book);
fs.writeFileSync("first-json.json", bookJSON);

// first-json.json 파일이 생성되고 아래와 같이 코드가 적혀 있는 것을 확인할 수 있다.
{"title":"Such a beautiful day","author":"Su Jeong"}
```
#### fs module을 활용한 파일 읽기
```javascript
const fs = require("fs");
const dataBuffer = fs.readFileSync("first-json.json");
console.log(dataBuffer);

/* 실행 결과
<Buffer 7b 22 74 69 74 6c 65 22 3a 22 53 75 63 68 20 61 20 62 65 61 75 74 69 66 75 6c 20 64 61 79 22 2c 22 61 75 74 68 6f 72 22 3a 22 53 75 20 4a 65 6f 6e 67 ... 
2 more bytes>
*/
```

#### Buffer 데이터를 String으로 변환
```javascript
const fs = require('fs');

const dataBuffer = fs.readFileSync("first-json.json");
const dataJSON = dataBuffer.toString();

console.log(dataJSON);

// 실행 결과
$ node app.js
{"title":"Such a beautiful day","author":"Su Jeong"}
```

#### title 값만 추출
```javascript
const fs = require("fs");

const dataBuffer = fs.readFileSync("first-json.json");
const dataJSON = dataBuffer.toString();

const data = JSON.parse(dataJSON);
console.log(data.title);

// 실행 결과
Such a beautiful day
```

#### fs module을 활용해 json 파일 업데이트 하는 방법
```javascript
const fs = require("fs");

const dataBuffer = fs.readFileSync("first-json.json");
const dataJSON = dataBuffer.toString();
const book = JSON.parse(dataJSON);

book.title = "Hello World!";
book.author = "Yongsu Jeong";

const bookJSON = JSON.stringify(book);
fs.writeFileSync("first-json.json", bookJSON);

// 실행 결과
{"title":"Hello World!","author":"Yongsu Jeong"}
```




