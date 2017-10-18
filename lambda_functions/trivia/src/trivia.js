//
// Another random test to grab trivia questions from a public API
//
import https from 'https';

const url = "https://opentdb.com/api.php?amount=5&category=25&difficulty=medium&type=multiple";
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

const apiCall = (params, callback) => {
  https.get(url, resp => {
    resp.setEncoding("utf8");
    let body = '';
    resp.on("data", data => { body += data });
    resp.on("end", () => {
      callback(null, JSON.parse(body))
    });
    resp.on("error", (error) => {
      console.log("error: ", error);
      callback({error})
    })
  });

};

const callbackTest = (error, response) => console.log("response: ", response);

exports.handler = (event, context, callback) => apiCall(event, callback);

apiCall(null, callbackTest);
