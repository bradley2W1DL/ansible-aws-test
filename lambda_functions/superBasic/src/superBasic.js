//
// How simple can I make it?
//

exports.handler = (event, context, callback) => (
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({message: "it totally worked!"})
  })
);
