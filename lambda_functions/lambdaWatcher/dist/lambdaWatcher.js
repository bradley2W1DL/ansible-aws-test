'use strict';

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Keep an eye out for changes to the lambda functions s3 bucket
//
console.log('lambdaWatcher loading...');


var lambda = new _awsSdk2.default.Lambda({ apiVersion: '2015-03-31' });

exports.handler = function (event, context) {
  var key = event.Records[0].s3.object.key;
  var version = event.Records[0].s3.object.versionId;
  var bucket = event.Records[0].s3.bucket.name;
  //
  var functions = fetchLambdaFunctions();
  console.log(functions);
  //
  if (key && bucket && version) {
    // promote this newly updated function to lambda ??
    // const functions = fetchLambdaFunctions();
    // console.log(functions)
  }
};

var fetchLambdaFunctions = function fetchLambdaFunctions() {
  var params = {
    Marker: '',
    MaxItems: 50
  };
  var list = [];

  lambda.listFunctions(params, function (err, data) {
    if (err) {
      console.log('listFunctions error: ', err);
    } else {
      console.log(data);
    }
  });
};