//
// Keep an eye out for changes to the lambda functions s3 bucket
//
console.log('lambdaWatcher loading...');
import aws from 'aws-sdk';

const lambda = new aws.Lambda({apiVersion: '2015-03-31'});

exports.handler = (event, context) => {
  const key = event.Records[0].s3.object.key;
  const version = event.Records[0].s3.object.versionId;
  const bucket = event.Records[0].s3.bucket.name;
  //
  const functions = fetchLambdaFunctions();
  console.log(functions);
  //
  if (key && bucket && version) {
    // promote this newly updated function to lambda ??
    // const functions = fetchLambdaFunctions();
    // console.log(functions)
  }
};


const fetchLambdaFunctions = () => {
  const params = {
    Marker: '',
    MaxItems: 50
  };
  let list = [];

  lambda.listFunctions(params, (err, data) => {
    if (err) {
      console.log('listFunctions error: ', err);
    } else {
      console.log(data);
    }
  })
};

