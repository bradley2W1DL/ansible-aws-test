"use strict";

var _https = require("https");

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "https://opentdb.com/api.php?amount=5&category=25&difficulty=medium&type=multiple";
// important to always name this "handler" for my ansible script

// exports.handler = (event, context, callback) => {
//   // const numberOfQuestion = event.count || 5;
//   https.get(url, resp => {
//     resp.setEncoding("utf8");
//     let body = '';
//     resp.on("data", data => { body += data });
//     resp.on("end", () => {
//       callback(JSON.parse(body))
//     })
//   });
//   callback("something went wrong")
// };

//
// Another random test to grab trivia questions from a public API
//
var apiCall = function apiCall(params, callback) {
  _https2.default.get(url, function (resp) {
    resp.setEncoding("utf8");
    var body = '';
    resp.on("data", function (data) {
      body += data;
    });
    resp.on("end", function () {
      callback(null, JSON.parse(body));
    });
    resp.on("error", function (error) {
      console.log("error: ", error);
      callback({ error: error });
    });
  });
};

var callbackTest = function callbackTest(error, response) {
  return console.log("response: ", response);
};

exports.handler = function (event, context, callback) {
  return apiCall(event, callback);
};

apiCall(null, callbackTest);