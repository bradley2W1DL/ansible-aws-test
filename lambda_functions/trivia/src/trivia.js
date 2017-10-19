//
// Another random test to grab trivia questions from a public API
//
import https from 'https';

const url = "https://opentdb.com/api.php?amount=5&category=25&difficulty=medium&type=multiple";

exports.handler = (event, context, callback) => {
  console.log(event);
  https.get(url, resp => {
    resp.setEncoding("utf8");
    let body = '';
    resp.on("data", data => { body += data });
    resp.on("end", () => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body)
      });
    });
    resp.on("error", (error) => {
      const jsonError = JSON.stringify(error);
      callback(jsonError, {
        statusCode: error.status,
        body: jsonError
      })
    })
  });
};

// exports.handler = (event, context, callback) => apiCall(event, callback);

