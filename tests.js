
let intent = {},
    session = {},
    response = {}
let context = {}
const GENDERCUTOFFDATE = new Date("12.6.1953")
const PENSIONRULES = require('./PensionRules.json');

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
                // log("date :" + dob);
                pension.date = new Date(dob).setMonth(dob.getMonth() + pensionRule.totalmonth);

            } else {
                // log("date :" + pensionRule.pensiondate);
                date = new Date(pensionRule.pensiondate);
            }
        }

        return pension
    }


    function getRuleFromFile(dob, gender) {
        for (let item of PENSIONRULES) {
            if (dob > new Date(item.dob)
                && dob < new Date(item.dobrange)
                && gender == item.gender) {
                log("item: " + item.toString());
                return item;
            }
        }
    }


    return calculatePensionStats(getRuleFromFile(dob, gender));
}


function toPensionAgeSnippet(pensionAge) {
    log(pensionAge);
    let text = "<s>Your pension age is ";

    text += "<say-as interpret-as='cardinal'>" + pensionAge.years + "</say-as> years";

    if (pensionAge.month) {
        text += " and " + "<say-as interpret-as='cardinal'>" + pensionAge.month + "</say-as> month";
    }
    text += ".</s>";

    if (pensionAge.date) {
        // log(new Date(pensionAge.date));
        text += "<s>Your pension date is <say-as interpret-as='date' format='mdy'>"+ new Date(pensionAge.date).toDateString() + "</say-as>. </s>"
    }

    return text;
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


let log = (x) => console.log(x);

// log(getNextResponse(context));

context.yob = 1962
// log(getNextResponse(context));
context.yob = 1949
// log(getNextResponse(context));

context.dob = new Date("12.20.1984");
// log(context.dob)
// log(getNextResponse(context));

let dob = new Date("12.20.1983")
let gender = "unisex"

for (let item of PENSIONRULES) {
    if (dob > new Date(item.dob)
        && dob < new Date(item.dobrange)
        && gender == item.gender
    ) {
        log("item: " + item.pensionyears);
    }
}
pensionAge = getPensionAge(context);

log(toPensionAgeSnippet(pensionAge));