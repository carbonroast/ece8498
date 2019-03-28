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
const admin = 'xxxxxxxxx'; // Replace with your number
const friend = 'yyyyyyyy';

const msg = 'I\'m sick, not coming in today, Nathan';
const prank = 'Hello Thomas, When was the last time you called Me. Its been so long.  -Mother';
const catfacts = 'Congradualations, you have subscribed to cat facts!';

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);
	if (event.clickType == "SINGLE")
	{
	const payload = JSON.stringify(event);
	const params = {
	  PhoneNumber: admin,
	  Message: msg,
	};
	SNS.publish(params, callback);
	}

	if (event.clickType == "DOUBLE")
	{
	const payload = JSON.stringify(event);
	const params = {
	  PhoneNumber: friend,
	  Message: prank,
	};
	SNS.publish(params, callback);
	}
	if (event.clickType == "LONG")
	{
		const payload = JSON.stringify(event);
		const params = {
			PhoneNumber: friend,
			Message: catfacts,
		};
		SNS.publish(params, callback);
	}
    // result will go to function callback

};