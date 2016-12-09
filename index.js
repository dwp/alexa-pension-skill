/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Hello World to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

var KEY_DOB = "date_of_birth";
var KEY_GENDER = "gender"

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * HelloWorld is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var DwpPensionAge = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
DwpPensionAge.prototype = Object.create(AlexaSkill.prototype);
DwpPensionAge.prototype.constructor = DwpPensionAge;



/**
 * Alexa Eventhandlers
 */
DwpPensionAge.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("DWP Pension Age onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

DwpPensionAge.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

DwpPensionAge.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};


/**
 * Routing intents to the right process
 */
DwpPensionAge.prototype.intentHandlers = {
    // register custom intent handlers
    "PensionAgeIntent": function (intent, session, response) {
        response.tellWithCard("Hello World!", "Hello World", "Hello World!");
    },
    "PensionEligibilityIntent": function (intent, session, response) {
        response.tellWithCard("Hello World!", "Hello World", "Hello World!");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("<speak>You can ask DWP for your pension age and for the eligibility criteria. <break time=\"0.2s\" />" +
            "Just ask: What is my pension age or What are the pension eligibility criteria? </speak>");
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Thank you and goodbye";
        response.tell(speechOutput);
    }
};



/**
 * Returns the welcome response for when a user invokes this skill.
 */
function getWelcomeResponse(response) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var speechText = "Welcome to D.W.P. Pension Age calculator. You can ask to calculate your pension age or for the U.K. pension eligibility criteria?";
    var repromptText = "<break>You can say, <break time=\"0.2s\">" +
        "Calculate my pension age or what are the eligibility criteria in UK.</speak>";

    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.SSML
    };
    response.ask(speechOutput, repromptOutput);
}

/**
 *
 * Returns the pension age
 * @param date_of_birth
 * @param gender
 */
function calculatePensionAge(date_of_birth, gender) {
    null
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var dwpPensionAge = new DwpPensionAge();
    dwpPensionAge.execute(event, context);
};

