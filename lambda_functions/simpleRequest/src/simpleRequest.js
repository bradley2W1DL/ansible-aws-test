// Make a basic API GET request using axios and console log the result
import axios from 'axios';

const weatherUrl = "https://www.metaweather.com/api/location/search/?query=boulder";

exports.handler = (event, context, callback) => {
  let response_hash = { event };
  axios.get(weatherUrl)
    .then(response => {
      console.log(response.data);
      response_hash.response = response.data;
      callback(null, response_hash)
    })
    .catch(response => {
      console.log('mad errors broh!', response.error);
      response_hash.response = { msg: 'mad errors broh!', error: response.error };
      callback(response.status, response_hash)
    });
};


