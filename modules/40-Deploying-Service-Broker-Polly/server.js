var AWS = require('aws-sdk');
var Fs = require('fs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  if (process.env.VCAP_SERVICES == '{}') {
    res.send("couldn't find a binding for the Polly service");
  } else {
    var serviceBindings = JSON.parse(process.env.VCAP_SERVICES)['polly'][0]['credentials'];
    var polly = new AWS.Polly({
      region: "us-west-2",
      accessKeyId: serviceBindings.POLLY_AWS_ACCESS_KEY_ID,
      secretAccessKey: serviceBindings.POLLY_AWS_SECRET_ACCESS_KEY
    });
    var params = {
      OutputFormat: 'mp3',
      Text: 'Welcome to Spring one!',
      VoiceId: 'Brian',
    };
    polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
          res.send(err + "\n\n" + err.stack);     // an error occurred
      } else {
        Fs.writeFile("./speech.mp3", data.AudioStream, (err) => {
          if (err) {
            res.send(err + "\n\n" + err.stack);
          } else {
            var stat = Fs.statSync('./speech.mp3');
            res.writeHead(200, {
              'Content-Type': 'audio/mpeg',
              'Content-Length': Fs.statSync('./speech.mp3').size,
            });
            var readStream = Fs.createReadStream('./speech.mp3');
            readStream.pipe(res);
          }
        });
        //res.send(JSON.stringify(serviceBindings, null, 4));
      }
    });
  }
});

app.listen( process.env.PORT || 4000);
