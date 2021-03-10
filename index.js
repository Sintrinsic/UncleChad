/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
// TODO review new sdk below
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// TODO Set the region 
AWS.config.update({region: 'us-west-2'});

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Uncle Chad';
const GET_FACT_MESSAGE = "I consulted the universe, and : ";
const HELP_MESSAGE = 'You can say, Ask Uncle Chad who is the best, or Ask Uncle Chad to give me some advice.';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const chad = require("./uncleChad");
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data1 = [
    'Brandon is the best, obviously.'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('adviceintent');
    },
    'thebestintent': function () {
        const factArr = data1;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        let params = {
          DelaySeconds: 0,
          /* TODO message attributes example
          MessageAttributes: {
            "Title": {
              DataType: "String",
              StringValue: "The Whistler"
            },
            "Author": {
              DataType: "String",
              StringValue: "John Grisham"
            },
            "WeeksOn": {
              DataType: "Number",
              StringValue: "6"
            }
          },*/
          MessageBody: "Brandon is the best",
          // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
          // MessageId: "Group1",  // Required for FIFO queues
          QueueUrl: "https://sqs.us-west-2.amazonaws.com/814804477123/hackathon"
        };

        sqs.sendMessage(params, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else {
            console.log("Success", data.MessageId);
          }
        });
        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },    
    'adviceintent': function () {
        const factArr = data1;
        const randomFact = chad.getAdvice();
        const speechOutput = randomFact;

        let params = {
          DelaySeconds: 0,
          /* TODO message attributes example
          MessageAttributes: {
            "Title": {
              DataType: "String",
              StringValue: "The Whistler"
            },
            "Author": {
              DataType: "String",
              StringValue: "John Grisham"
            },
            "WeeksOn": {
              DataType: "Number",
              StringValue: "6"
            }
          },*/
        }

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.UnknownIntent': function () {
    this.response.speak(HELP_MESSAGE);
    this.emit(':responseReady');
    },
    'UnknownIntent': function () {
    this.response.speak(HELP_MESSAGE);
    this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
