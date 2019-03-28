var https = require('https');

'use strict';

const AWS = require('aws-sdk');

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const Nathan = '19732704638'; // Replace with your number
const Andrew = '19738973149'; // Replace with your number
const Ha = '14846328961'; // Replace with your number
const Jon = '19739607812';

exports.handler = function(event, context, callback) {
  if (event.clickType == "SINGLE")
  {
    const payload = JSON.stringify(event);
    const params = {
      PhoneNumber: Nathan,
      Message: 'Nathan Took out Garbage',
  };
    SNS.publish(params, callback);
  }

  if (event.clickType == "DOUBLE")
  {
    const payload = JSON.stringify(event);
    const params = {
      PhoneNumber: Nathan,
      Message: "Betsy Took out Garbage",
  };
    SNS.publish(params, callback);
  }
  var body='';
  var jsonObject = JSON.stringify(event);

  // the post options
  var optionspost = {
      host: 'maker.ifttt.com',
      path: '/trigger/' + event.clickType + '/with/key/dXpwtC7pwrkZoRLGxR-4fI',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
  };

  var reqPost = https.request(optionspost, function(res) {
      console.log("statusCode: ", res.statusCode);
      res.on('data', function (chunk) {
          body += chunk;
      });
      context.succeed('Thanks Marcus');
  });

  reqPost.write(jsonObject);
  reqPost.end();
  

    
};

