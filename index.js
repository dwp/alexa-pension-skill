/**
 * Created by calvindudek on 16/12/2016.
 */
var Alexa = require('alexa-sdk');
var moment = require('moment'); // deals with dates and date formatting, for instance converts AMAZON.DATE to timestamp

// States are required for conversational skills.
// States assume a context. e.g. _DOB expects date of birth; providing a gender in this state would confuse Alexa.
// UX design principle have to be as unambiguous as possible in language (e.g. "are you male or female" vs "what gender are you?")
var states = {
    START: '_STARTMODE',  // Prompt the user to start or restart
    DOB: '_DOB',
    GENDER: '_GENDER',
    ANSWER: '_ANSWER'
};


// Outbound messages spoken back to end user.
// alexa-nodejs-sdk wraps all strings in the advanced SSML speech markup (<speak>STRING HERE</speak>) that allows phonetic overrides etc.
var snippets = {
            WELCOME: "<s>Welcome to the <say-as intepret-as=\"spell-out\">DWP</say-as>Pension Age calculator.</s> " +
            "<s>You can ask to calculate your pension age or for the <say-as intepret-as=\"spell-out\">UK</say-as> pension eligibility criteria?</s>",

            WELCOME_REPROMPT: "You can say, " +
            "Calculate my pension age or, say what are the eligibility criteria in the <say-as intepret-as=\"spell-out\">UK</say-as>.",

            GENDER: "Thank you. Are you female or male?",

            GENDER_REPROMPT: "In order to calculate your pension age, please tell me: Are you male or female?",

            GENDER_INVALID: "Sorry I couldn't understand your gender, can you please tell me if you are you male or female?",

            DATEOFBIRTH: "Ok, please tell me what is your date of birth?",

            DATEOFBIRTH_REPROMPT: "In order to calculate your pension age please tell me your date of birth?",

            DATEOFBIRTH_INVALID_FUTURE: "Nice you're from the future. Did you bring a hoverboard? Seriously, can you please say your actual date of birth please?",

            DATEOFBIRTH_INVALID: "Please say your date of birth. For example you can say, my date of birth is the <say-as intepret-as=\"date\">19831220</say-as>",

            STOP: "Thank you for using the <say-as intepret-as=\"spell-out\">DWP</say-as> pension calculator.",

            HELP: "You can ask things like: What is my pension age or what are the eligibility criteria.",

            HELP_REPROMPT: "Simply say: calculate pension or eligibility criteria.",

            UNHANDLED: "I'm sorry I couldn't understand what you meant. Can you please say it again?"
};


// You define a set of state handlers for every state PLUS the new session / launch event.
var newSessionHandlers = {

    // session variables stored in this.attributes
    // session state is stored in this.handler.state
    // handler.state vs Intent vs
    'LaunchRequest': function() {
        if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
            this.attributes['dob'] = undefined;
            this.attributes['gender'] = undefined;
        }
        // Initialise State
        this.handler.state = states.START;

        // emitWithState should be called executeStateHandler("Start").
        // As such this will call a handler "Start" in the startStateHandlers object.
        // Maybe this line and the previous line could be more coherently wrapped into a single
        // function:
        // this.stateTransition( states.START, "Start" )
        this.emitWithState("Start")
    },

    // It's unclear whether this can ever happen as it's triggered by Alexa itself.
    "Unhandled": function () {
        var speechText = "I wasn't launched yet";
        this.emit(":ask", speechText);
    }
};



// This is the beginning of our skill.
// This is a list of accepted intents Alexa is listening for
// when the skill has just started.
// In this specific version, a user can't provide things like date of birth
// or gender as part of the initial skill invocation because we've not included in this set of start state handlers.
// We could but haven't in this particular scenario.
var startStateHandlers = Alexa.CreateStateHandler(states.START, {
    'Start': function() {

        this.handler.state = states.START;
        var speechText = snippets.WELCOME;
        var repromptText = snippets.WELCOME_REPROMPT;

        // emit is the exit point to instruct Alexa how to and what to communicate with end user.
        // e.g. do we want further information? (:ask) / no further information, skill terminates (:tell)
        // do we provide a voice response with or without a card on the mobile device (:ask vs :askWithCard)
        // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
        // as we've said :ask we are expecting the user to provide more information.
        // maybe this function could be called this.respond()
        // this is going to speak the snippets.WELCOME which implicitly asks a question (hence :ask).
        // reprompt text is automatically spoken after a few seconds. This is a feature of the NodeJS SDK.
        // See Unhandled for the fallback / unrecognised utteranes.
        this.emit(':ask', speechText, repromptText);
    },

    // the intent text is defined in the
    // Alexa interaction model web page at developer.amazon.com/ask
    // represented as sample utterances.
    'StartCalculationIntent': function () {
        var speechText = snippets.DATEOFBIRTH;
        var repromptText = snippets.DATEOFBIRTH_REPROMPT;

        // Change State to calculation
        this.handler.state = states.DOB;
        this.emit(':ask', speechText, repromptText);
    },

    // a predefined Utterance that you don't need to define in your interaction model
    // We are choosing to provide this help function but equally you don't need to.
    "AMAZON.HelpIntent": function () {
        var speechText = snippets.HELP;
        var repromptText = snippets.HELP_REPROMPT;
        this.emit(':ask', speechText, repromptText);
    },
    "Unhandled": function () {
        var speechText = snippets.UNHANDLED;
        this.emit(":ask", speechText);
    },

    // User says stop. Stops even in the middle of a response.
    "AMAZON.StopIntent": function () {
        var speechText = snippets.STOP;
        this.emit(":tell", speechText);
    },

    // unclear really what the difference is; default working practice is
    // to do the same thing
    // in a production system we'd probably dedupe this function.
    "AMAZON.CancelIntent": function () {
        var speechText = snippets.STOP;
        this.emit(":tell", speechText);
    },
    "AMAZON.StartOverIntent": function () {
        this.emitWithState("Start")
    },

    // TODO determine when this is requested and what initiates it
    // Implement handler to save state if state should be stored persistently e.g. to DynamoDB
    // 'SessionEndedRequest': function () {
    //     console.log('session ended!');
    //     this.emit(':saveState', true);
    // }

    // TODO add 'AMAZON.RepeatIntent' that repeats the last question.

});



var dobStateHandlers = Alexa.CreateStateHandler(states.DOB, {

    'DateOfBirthIntent': function () {
        var speechText = "",
            repromptText = "";

        var date_string = this.event.request.intent.slots.dob.value;
        var date = moment(date_string);

        if (date.isValid()) {

            if (!isFutureDate(date)) {
                // ALL GOOD – dob not in the future
                speechText = snippets.GENDER;
                repromptText = snippets.GENDER_REPROMPT;
                this.attributes['dob'] = date;

                // Transition to next state
                this.handler.state = states.GENDER;
                this.emit(':ask', speechText, repromptText);

            } else {
                // dob in the future
                speechText = snippets.DATEOFBIRTH_INVALID_FUTURE;
                repromptText = snippets.DATEOFBIRTH_INVALID_FUTURE; // could be improved by using alternative prompt text
                this.emit(':ask', speechText, repromptText);
            }

        } else {
            // not a valid Date
            speechText = snippets.DATEOFBIRTH_INVALID;
            repromptText = snippets.DATEOFBIRTH_INVALID; // could be improved by using alternative prompt text
            this.emit(':ask', speechText, repromptText);
        }
    },
    "AMAZON.HelpIntent": function () {
        var speechText = snippets.HELP;
        var repromptText = snippets.HELP_REPROMPT;
        this.emit(':ask', speechText, repromptText);
    },
    "Unhandled": function () {
        var speechText = snippets.UNHANDLED;
        this.emit(":ask", speechText);
    },
    "AMAZON.StopIntent": function () {
        var speechText = snippets.STOP;
        this.emit(":tell", speechText);
    },
    "AMAZON.CancelIntent": function () {
        var speechText = snippets.STOP;
        this.emit(":tell", speechText);
    },
    "AMAZON.StartOverIntent": function () {
        this.emitWithState("Start")
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':saveState', true);
    }
});


var genderStateHandlers = Alexa.CreateStateHandler(states.GENDER, {
    'GenderIntent': function () {
        var speechText = "",
            repromptText = "";

        var gender = this.event.request.intent.slots.gender.value;

        if (isGenderSlotValid(gender)) {
            // valid gender
            this.attributes['gender'] = gender;

            this.handler.state = states.ANSWER;
            this.emitWithState("Answer")
        } else {
            // not a valid gender
            speechText = snippets.GENDER_INVALID;
            repromptText = snippets.GENDER_INVALID; // could be improved by using alternative prompt text

            this.emit(':ask', speechText, repromptText);
        }
    },
    "AMAZON.HelpIntent": function () {
        var speechText = snippets.HELP;
        var repromptText = snippets.HELP_REPROMPT;
        this.emit(':ask', speechText, repromptText);
    },
    "Unhandled": function () {
        var speechText = snippets.UNHANDLED;
        this.emit(":ask", speechText);
    },
    "AMAZON.StopIntent": function () {
        var speechText = snippets.STOP;
        this.emit(":tell", speechText);
    },
    "AMAZON.CancelIntent": function () {
        var speechText = snippets.STOP;
        this.emit(":tell", speechText);
    },
    "AMAZON.StartOverIntent": function () {
        this.emitWithState("Start")
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(':saveState', true);
    }
});



var answerStateHandlers = Alexa.CreateStateHandler(states.ANSWER, {
    'Answer': function () {
        // TODO implement function to properly calculate pension age
        // index.backup.js holds this code but I didn't manage to integrate it with this file
        var speechText = "Your pension age is sixty eigth";

        // Change State to Start again
        this.handler.state = states.START;
        this.emit(':tell', speechText);
    },
    "Unhandled": function () {
        var speechText = snippets.UNHANDLED;
        this.emit(":ask", speechText);
    }
});



function isGenderSlotValid(gender) {
    if (gender == "male" || gender == "female") {
        return true
    } else {
        return false
    }
}


function isFutureDate(dob) {
    var today = moment();

    if (dob > today) {
        return true
    } else {
        return false
    }
}




exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = process.env.appId;
    // alexa.appId = "your skill ID"; // better store it as ENV variable at AWS Lambda
    // alexa.resources = languageStrings;

    // register intent handlers for each state + new session.
    // Each state constrains possible intents Alexa is listening for.
    // If you only have one handler you are context-free and cannot have state.
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, dobStateHandlers, genderStateHandlers, answerStateHandlers);
    alexa.execute();
};
