//
// Another random test to grab trivia questions from a public API
//
import https from 'https';

const url = "https://opentdb.com/api.php?amount=5&category=25&difficulty=medium&type=multiple";

exports.handler = (event, context, callback) => {

  https.get(url, resp => {
    resp.setEncoding("utf8");
    let body = '';
    console.log('request triggered');
    resp.on("data", data => { body += data });
    resp.on("end", () => {
      callback(null, {
        statusCode: 200,
        body
      });
    });
    resp.on("error", (error) => {
      callback(null, {
        statusCode: 500,
        body: error
      });
    });
  });
};
