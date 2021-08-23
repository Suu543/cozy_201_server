## Node Core Summary
- We don't have the `window` object in Node
- The global object is Node in `global`

- Unlike browser applications, variables we define are not added to the global object.

- Every file in a Node application is a `module`. Node automatically wraps the code in each file with an `IIFE` (Immediately-invoked Function Expression) to create scope. 

- So, variables and functions defined in one file are only scoped to that file and not visible to other files unless explicitly exported.

- To export a variable or function from a module, you need to add them to `module.exports`:
```javascript
function sayHello() {
    console.log('Hello World!')
}

module.exports.sayHello = sayHello;
```
- To load a `module`, use the `require function`. This function returns the `module.exports` object exported from the target module: `const logger = require("./logger.js")`

- Node has a few built-in modules that enable us to work with the file system, path objects, network, operating system, etc.

- `EventEmitter` is one of the core classes in Node that allows us to raise (emit) and handle events. Several built-in classes in Node derive from `EventEmitter`

- To create a class with the ability to raise events, we should extend `EventEmitter`:
```javascript
class Logger extends EventEmitter {
    ...
}
```

### NPM
- Event Node application has a `package.json` file that includes metadata about the application. (HTML의 Head 태그를 생각하면된다.) This includes the name of application, its version, dependencies, etc.

- We use NPM to download and install 3rd-party packages from NPM registry:

- All the installed packages and their dependencies are stored under node_modules folders. This folder should be excluded from the source control.

- Node packages follow semantic version: major.minor.patch

Useful NPM commands are:
```javascript
// Statekit
npm init --y

// Install a package
npm i <packageName>

- https://www.npmjs.com/package/underscore
npm install underscore --save
npm i underscore --save
// underscore module의 package.json 확인하기, 모든 module은 각자의 package.json을 가지고 있다.

// Using a package
// index.js
const _ = require("underscore"); // underscore.js - same folder

// 1. Core Module --> 이거인가?
// 2. File or Folder --> 아니면 이거인가?
// 3. node_modules (./ ../ 등 안 붙이면 node_modules 안에 있다 간주한다) --> 그래도 아니면 이거인가 확인, 그래도 아니면 에러...

let result = _.contains([1, 2, 3], 2);
console.log(result);

// -------------------------------------------------------------------------------
// Package Dependencies 
// Practice - mongoose를 설치하시오
npm i mongoose --save
// package.json에 mongoose가 추가되었는지 확인
ls node_modules/ 

// -------------------------------------------------------------------------------
// NPM Packages and Source Control
// node_modules는 너무 크기가 크기 때문에 누군가에게 공유할 때 이것은 빼고 공유한다. 그 이유는 package.json에 모든 정보가 정리되어있기 때문이다.
// package.json만 있다면, npm i 을 하면 정리된 정보를 보고 필요한 module을 모두 다운로드한다.
git init
git status
touch .gitignore
// .gitignore
node_modules/

git status
git commit -m 'Our First Commit'

// -------------------------------------------------------------------------------
// Semantic Versioning - SemVer
// package.json
"dependencies": {
    "mongoose": "^4.13.6" // Major.Minor.Patch
}

// -------------------------------------------------------------------------------
// Listing the Installed Packages
npm list
npm list --depth=0

// -------------------------------------------------------------------------------
// Viewing Registry Info for a Package
- https://www.npmjs.com/package/mongoose
npm view mongoose
npm view mongoose dependencies

// -------------------------------------------------------------------------------
// Installing a specific version of a package
npm i <packageName>@<version>
npm i mongoose@2.4.2
npm list --depth=0

// Practice -- underscore 1.4.0을 다운로드하시오
npm i underscore@1.4.0

// -------------------------------------------------------------------------------
// Updating Local Packages
npm outdated

// Only wanted
npm update

// If you want latest
npm i -g npm-check-updates
npm-check-updates
ncu -u

npm i
npm outdated

// -------------------------------------------------------------------------------
// DevDependencies
// UnitTest등 Development 동안에만 필요한 도구가 있는 경우 DevDependencies에 저장
npm i jshint --save-dev

// -------------------------------------------------------------------------------
// Uninstalling a Package
npm uninstall mongoose
// or
npm un mongoose

// -------------------------------------------------------------------------------
// Working witht Global Packages
npm i -g outdated
npm un -g 

// Publishing a Package
mkdir hello-lib
cd hello-lib
npm init --yes
touch index.js

// index.js
module.exports.add = function(a, b) { return a + b}

// npm account 만들기
npm login
Username: ...
Password: ...
Email: ....

// Publishing a Package
npm publish

mkdir node-app
cd node-app
npm i hello-lib

// index.js 
const lion = require("hello-lib");
let result = lion.add(1, 2);

console.log(result);

// -------------------------------------------------------------------------------
// Updating a Published Package
// hello-lib
module.exports.multiply = function(a, b) { return a * b}
npm publish 
// 에러 발생 - You cannot publish over the previously published version 1.0.0
npm version minor
npm publish
```