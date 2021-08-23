const url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

// Case 1
module.exports.log = log;
module.exports.case = "Case 1";

// Case 2
exports.log = log;
exports.case = "Case 2";

// Case 3
module.exports = "항상 클래스 Constructor 혹은 Object 만";
// module.exports = log;
// module.exports.one = "5";
