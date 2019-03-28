/**
 * This is a sample Lambda function that sends an SMS on click of a
 * button. It needs one permission sns:Publish. The following policy
 * allows SNS publish to SMS but not topics or endpoints.
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Deny",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "arn:aws:sns:*:*:*"
            ]
        }
    ]
}
 *
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */

'use strict';

const AWS = require('aws-sdk');

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const number = 'xxxxxxxxxx'; // Replace with your number


const msg = 'Time is Running Out \n \
==Muse== \n \
\n \
I think I\'m drowning \n \
Asphyxiated \n \
I want to break the spell \n \
That you\'ve created \n \
\n \
You\'re something beautiful \n \
A contradiction \n \
I want to play the game \n \
I want the friction \n \
\n \
You will be \n \
The death of me \n \
Yeah, you will be \n \
The death of me \n \
\n \
Bury it \n \
I won\'t let you bury it \n \
I won\'t let you smother it \n \
I won\'t let you murder it \n \
\n \
Our time is running out \n \
And our time is running out \n \
You can\'t push it underground \n \
We can\'t stop it screaming out \n \
\n \
I wanted freedom \n \
But I\'m restricted \n \
I tried to give you up \n \
But I\'m addicted \n \
\n \
Now that you know I\'m trapped \n \
Sense of elation \n \
You\'ll never dream of breaking this fixation \n \
You will squeeze the life out of me \n \
\n \
Bury it \n \
I won\'t let you bury it \n \
I won\'t let you smother it \n \
I won\'t let you murder it \n \
\n \
Our time is running out \n \
And our time is running out \n \
You can\'t push it underground \n \
We can\'t stop it screaming out \n \
How did it come to this \n \
\n \
You will suck the life out of me \n \
\n \
Bury it \n \
I won\'t let you bury it \n \
I won\'t let you smother it \n \
I won\'t let you murder it \n \
\n \
Our time is running out \n \
And our time is running out \n \
You can\'t push it underground \n \
We can\'t stop it screaming out \n \
\n \
How did it come to this' ;

exports.handler = (event, context, callback) => {
	console.log('Received event:', event);

	if (event.clickType == "SINGLE")
	{
	const payload = JSON.stringify(event);
	const params = {
	  PhoneNumber: number,
	  Message: msg,
	};
	SNS.publish(params, callback);
	}



    // result will go to function callback

};