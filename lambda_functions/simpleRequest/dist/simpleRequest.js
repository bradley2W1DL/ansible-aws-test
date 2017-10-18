'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weatherUrl = "https://www.metaweather.com/api/location/search/?query=boulder"; // Make a basic API GET request using axios and console log the result


exports.handler = function (event, context, callback) {
  var response_hash = { event: event };
  _axios2.default.get(weatherUrl).then(function (response) {
    console.log(response.data);
    response_hash.response = response.data;
    callback(null, response_hash);
  }).catch(function (response) {
    console.log('mad errors broh!', response.error);
    response_hash.response = { msg: 'mad errors broh!', error: response.error };
    callback(response.status, response_hash);
  });
};