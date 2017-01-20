# alexa-pension-skill
This is an Alexa skill that lets users find out what their pension age in the UK is. The goal of this project was to experiment with Alexa and to find out how to implement a multi-turn Alexa skill.

We're using the [alexa-SDK for nodejs ](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs "alexa-SDK for nodejs "). Amazon also has a [Java SDK](https://github.com/amzn/alexa-skills-kit-java "SDK for Java") and [python / Flask SDK](https://github.com/amzn/alexa-skills-kit-java "python / Flask SDK"). All SDKs can be run on AWS Lambda. Lambda is an AWS service that let you directly run functions in the cloud without running or managing a server. Hereby you only pay for the time your function runs.

## Assets

```bash

./index.js # contains all of our code and logic
./index.backupg.js # was our first (and failed) attempt to develop an Alexa Skill
./package.json # contains the project definition and dependencies
./events #holds a session start event to test this app locally with the npm package lambda-local
./data # has a json file with the rules for the pension calculation
./screeshots # contains the screenshots for this readme.md
```

## Preparing for upload to Lambda
> We assume you have git and nodejs (including npm) installed. If you don't, pause here and install nodejs and git before you continue. 

First open the terminal and get a copy of the repository
```
git clone git@github.com:dwpdigitaltech/alexa-pension-skill.git
```

Open the folder and install the project dependencies with npm.
```
cd alexa-pension-skill
npm install
``` 

Lambda has an online editor where you can write or paste the functions you want to run. If your code has dependencies or need other local resources (e.g. file with json or XML) you can zip and upload it to AWS. If your unzipped package size is bigger than 10mb you won't be able to edit and update the code in the editor.

## What files do you need to zip:

```
# Essential! 
./index.js # You need to have a file named index.js in your folder when you zip it up for uploading to AWS Lambda
./node_modules # This folder contains all the dependencies

# if you have other directories or files with code, you need to add them too
```

> NOTE!
> It's important that the index.js is in root directory of the zip.
> You can do this by executing following command while being in the project folder
```
zip -r -D alexa-pension-skill-lambda.zip *
```

## Preparing the project for AWS Lambda
```
index.js
node_modules
data
```


```
cd YourProjectDirectory
zip -r -D zipped.zip *
```

## Uploading Code to AWS Lambda

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/001-aws-lambda.png" width="50%">
<hr>
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/002-create-lambda-function.png" width="50%">
<hr>
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/003-blueprints.png" width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/005-triggers.png" width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/006-triggers.png" width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/007-config-function.png " width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/008-iam-role.png" width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/009-create-iam-role.png" width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/010-choose-role.png" width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/011-create-function-finish.png" width="50%">
<hr>
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/012-upload-zip.png" width="50%">
<hr>
</p>


# Setting up the Alexa-Skill-kit
<p>
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/013-alexa-skills.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/014-alexa-skills-kit.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/015-create-new-skill.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/016-config-interaction-model.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/017-custom-slot-type.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/018-connect-to-lambda.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/019-get-app-id.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/020-set-appid-in-env-var.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/021-lambda-test-session-start-event.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/022-lambda-success.png" width="50%">
<hr>
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/023-test-interface.png" width="50%">
<hr>
</p>

# Testing
Echoism.io
On alexa
Local Lambda testing with Events
