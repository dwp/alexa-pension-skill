# alexa-pension-skill
This is an Alexa skill that lets users find out what their pension age in the UK is. The goal of this project was to understand how public service reach could be extended through the voice computing channel with Alexa and similar technologies and to find out how to implement a conversational Alexa skill that involves some memory of past questions.


## Alexa technical components
This demo uses the following components:
* Alexa front-end user experience along with the support library [alexa-SDK for nodejs ](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs "alexa-SDK for nodejs ").
* AWS Lambda for functional execution. All SDKs can be run on AWS Lambda which is an AWS service that let you directly run functions in the cloud without running or managing a server. Hereby you only pay for the time your function runs.


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

Lambda has an online editor where you can write or paste the functions you want to run. If your code has dependencies or need other local resources (e.g. file with json or XML) you can zip and upload it to AWS. If your unzipped package size is bigger than 10MB you won't be able to edit and update the code in the editor.

## The files AWS Lambda needs
The archive has files for both Alexa and AWS Lambda. The ones below are for Lambda. 

```
./index.js # You need to have a file named index.js in your folder when you zip it up for uploading to AWS Lambda
./node_modules # This folder contains all the dependencies
./data # for future version that uses the pension rules

```

> Zip structure
> It's important that the index.js is in root directory of the zip.
> You can do this by executing following command while being in the project folder
```
zip -r -D alexa-pension-skill-lambda.zip index.js node_modules/* data/*
```

## Uploading Code to AWS Lambda
<p>
	Go to the AWS service overview and search for Lambda
</p>

<p align="center">

<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/001-aws-lambda.png" width="50%">
</p>

<p>
	Click on the "Create a Lambda function"
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/002-create-lambda-function.png" width="50%">
</p>

<p>
	On the next screen select the "Blank Function" blueprint. 
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/003-blueprints.png" width="50%">
</p>

<p>
Lambda functions now need a trigger on which the it gets executed. In our case our trigger is the Alexa Skill Kit. Click on the dashed square left to the Lambda Icon and Select "Alexa Skill Kit".
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/005-triggers.png" width="50%">
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/006-triggers.png" width="50%">
</p>

<p>
	In the next step specify the name and description of the function. Make sure the Runtime is set to Node.js 4.3.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/007-config-function.png " width="50%">
</p>

<p>
	In the same window you need to create a new IAM Role for our function. Scroll to Role Summary and select "Create a custom role" in the Role dropdown.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/008-iam-role.png" width="50%">
</p>

<p>A new window opens. Give the role a name and save.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/009-create-iam-role.png" width="50%">
</p>

<p>
	Back in the Configure function screen select the IAM role you created. You can leave everything else like it was for now. Scroll down and continue.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/010-choose-role.png" width="50%">
</p>

<p>Review your settings and click on "Create function"</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/011-create-function-finish.png" width="50%">
</p>

<p>
	Now you are in the code-inline editor. However since our code has dependencies and a few other files we need to upload our code as zip. So click on the "Code entry type" dropdown and select "Upload a .ZIP file". Choose the zip file you created earlier. Normally even if we upload a zip file, Lambda would still let us edit the index.js file in the inline-code editor. However, because our node_modules files with all the dependencies is too big it won't show it anymore.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/012-upload-zip.png" width="50%">
</p>


# Setting up the Alexa-Skill-kit
<p>
	Now go to the <a href="https://developer.amazon.com/home.html">Amazon Developer Console</a>. If you don't have an account yet create one. For the purpose of testing it should be the same account which is associated with your Alexa Account. 
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/013-alexa-skills.png" width="50%">
</p>

<p>
	At the top menu click on Alexa and then continue with Get Started with Alexa Skill Kit.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/014-alexa-skills-kit.png" width="50%">
</p>

<p>
	Now we started setting up a new Alexa skill. Choose your Language, give your skill a name and finally define an invocation name. The invocation name has to have at least two words. It will be the keyword for starting your skill on Alexa e.g. "Alexa open pension age calculator". 
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/015-create-new-skill.png" width="50%">
</p>
<p>
	In the next screen go to speech_assets folder of this repository and copy the Intent Schema and Sample Utterances into respective text areas.
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/016-config-interaction-model.png" width="50%">
</p>


<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/017-custom-slot-type.png" width="50%">
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/018-connect-to-lambda.png" width="50%">
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/019-get-app-id.png" width="50%">
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/020-set-appid-in-env-var.png" width="50%">
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/021-lambda-test-session-start-event.png" width="50%">
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/022-lambda-success.png" width="50%">
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/023-test-interface.png" width="50%">
</p>
