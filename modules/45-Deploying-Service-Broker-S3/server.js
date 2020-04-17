var AWS = require('aws-sdk');
var express = require('express');
var app = express();
var text = 'Created by an app using the AWS Service Broker.\n\nVCAP_SERVICES:\n';

app.get('/', function(req, res){
  // If there is no binding data, we cannot proceed
  if (process.env.VCAP_SERVICES == '{}') {
    res.send("couldn't find a binding for the S3 service");
  } else {
    // Parse the VCAP_SERVICES environment variable and get the binding credentials
    var serviceBindings = JSON.parse(process.env.VCAP_SERVICES)['s3'][0]['credentials'];
    // Create an S3 client using the id and secret in the binding
    var s3 = new AWS.S3({
      accessKeyId: serviceBindings.S3_AWS_ACCESS_KEY_ID,
      secretAccessKey: serviceBindings.S3_AWS_SECRET_ACCESS_KEY
    });
    // prepare our s3 object
    var params = {
      Bucket: serviceBindings.BUCKET_NAME,
      Key: 'hi-there.txt',
      Body: text + JSON.stringify(
              JSON.parse(process.env.VCAP_SERVICES),
            null, 4),
    };
    // Put object to S3
    s3.putObject(params, function(err, data) {
      if (err) {
          res.send(err + "\n\n" + err.stack);
      } else {
        res.send('payload written to s3://' + serviceBindings.BUCKET_NAME + '/hi-there.txt');
      }
    });
  }
});

app.listen( process.env.PORT || 4000);
