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

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
const PENSIONRULES = require('./PensionRules.json');
const GENDERCUTOFFDATE = new Date("6.12.1953")
let log = (x) => console.log(x);
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
    getWelcomeResponse(response);
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
        getPensionAge(intent, session, response)
    },
    // To be improved
    "PensionEligibilityIntent": function (intent, session, response) {
        let text = "Eligibility. You must claim the new State Pension if you reach State Pension age on or after 6 April 2016. " +
            "The earliest you can get the basic State Pension is when you reach State Pension age. " +
            "To get the full basic State Pension you need a total of 30 qualifying years of National Insurance contributions or credits. " +
            "You can find more information at www.gov.uk/state-pension/eligibility"
        response.tellWithCard(text);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("<speak>You can ask DWP for your pension age and for the eligibility criteria. <break time=\"0.2s\" />" +
            "Just ask: What is my pension age or What are the pension eligibility criteria? </speak>");
    },
    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Thank you very much for using D.W.P. and goodbye";
        response.tell(speechOutput);
    }
};



/**
 * Returns the welcome response for when a user invokes this skill.
 */
function getWelcomeResponse(response) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var speechText = "Welcome to D.W.P. Pension Age calculator. You can ask to calculate your pension age or for the U.K. pension eligibility criteria?";
    var repromptText = "<speak>You can say, <break time=\"0.2s\">" +
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

function getPensionAge(intent, session, response) {
    if (intent.slots.dob) {
        session.attributes.dob = intent.slots.dob;
        session.attributes.yob = intent.slots.dob.getFullYear();
    }
    if (intent.slots.gender) {
        session.attributes.gender = intent.slots.gender;
    }
    if (intent.slots.yob) {
        session.attributes.yob = intent.slots.yob;
    }

    let context = session.attributes;


    switch (getNextResponse(context)) {
        case 'askDob':
            log("Ask for Date of Birth");
            speechOutput = "";
            repromptOutput = "";
            // response.ask()
            break;
        case 'askGender':
            log("Ask for Gender");
            speechOutput = "";
            repromptOutput = "";
            // response.ask()
            break;
        case 'tellPensionAge':
            log("Tell finate pension age results");
            getPensionAge(context);
            speechOutput = "";
            cardContent = "";
            cardTitle = "";
            response.tellWithCard(speechOutput, cardTitle, cardContent)
            break;
    }
}


/**
 * Returns the next response based on the current context
 * @param context
 * @returns {{}}
 */
function getNextResponse(context) {
    let question = {};


    if (!context.yob && !context.dob && !context.gender) {
        question.next = "askDob"

    } else if (context.yob && !context.dob) {
        if (isDobNeeded(context.yob)) {
            question.next = 'askDob';

        } else if (isGenderNeeded(new Date(context.yob, 0, 1)) && !context.gender){
            question.next = 'askGender';
        } else {
            question.next = 'tellPensionAge'
        }

    } else if (context.dob && !context.gender) {
        if (isGenderNeeded(context.dob)) {
            question.next = 'askGender';
        }

    } else if (context.gender && !context.dob && !context.yob) {
        question.next = 'askDob';
    } else {
        question.next = 'tellPensionAge'
    }
    return question;
}



/**
 * Returns the pension age
 * @param context
 */
function getPensionAge(context) {
    let pension = {};
    let dob = context.dob;
    let gender = (!context.gender) ? "unisex" : context.gender;

    if (!dob) {
        dob = new Date(context.yob, 0, 1);
    }



    function calculatePensionStats(pensionRule) {
        let pension = {
            years: pensionRule.pensionyears,
            month: pensionRule.pensionmonth
        };

        // Only include the pension date if we have the date of birth
        if (context.dob) {
            if (pensionRule.rule == "calculated") {
                pension.date = new Date(dob).set(dob.getMonth() + pensionRule.totalmonth);
            } else {
                date = pensionRule.pensiondate;
            }
        }

        return pension
    }


    function getRuleFromFile(dob, gender) {
        for (let item of PENSIONRULES) {
            if (dob > item.dob
                && dob < item.dobrange
                && gender == item.gender) {
                return item;
            }
        }
    }


    return calculatePensionStats(getRuleFromFile(dob, gender));
}

/**
 * Returns whether or not we need gender information
 * @param dob (date of birth)
 * @returns {boolean}
 */
function isGenderNeeded(dob) {
    return dob < GENDERCUTOFFDATE;
}

/**
 * Returns true if date of birth (dob) is needed or not
 * @param yob year of birth
 * @returns {boolean}
 */
function isDobNeeded(yob) {

    if (yob < 1950) {
        return false
    } else if (yob > 1954 && yob < 1960) {
        return false
    } else if (yob > 1961 && yob < 1977) {
        return false
    } else {
        return true
    }
}


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var dwpPensionAge = new DwpPensionAge();
    dwpPensionAge.execute(event, context);
};

