"use strict";

var _https = require("https");

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = "https://opentdb.com/api.php?amount=5&category=25&difficulty=medium&type=multiple"; //
// Another random test to grab trivia questions from a public API
//


exports.handler = function (event, context, callback) {
  console.log(event);
  _https2.default.get(url, function (resp) {
    resp.setEncoding("utf8");
    var body = '';
    resp.on("data", function (data) {
      body += data;
    });
    resp.on("end", function () {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
      });
    });
    resp.on("error", function (error) {
      var jsonError = JSON.stringify(error);
      callback(jsonError, {
        statusCode: error.status,
        body: jsonError
      });
    });
  });
};

// exports.handler = (event, context, callback) => apiCall(event, callback);