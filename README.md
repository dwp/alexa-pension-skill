# alexa-pension-skill – A multi-turn Alexa skill
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

<p>
Now click on "Next".
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

<p>
	In the same window click on the "Add Slot Type" button to create a custom slot for Gender which we need for the GenderIntent defined in the Intent Schema. Name the slot Type "LIST_OF_GENDERS". Now enter the values "male" and "female" below and click on "Save". After it's saved click on "Next"
</p>


<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/017-custom-slot-type.png" width="50%">
</p>

<p>
	Now we need to link this Alexa skill with our Lambda function. To do that select "AWS Lambda ARN (Amazon Resrouce Name)" as "Service Endpoint Type" and Choose "Europe" as Region. Finally Enter the ARN ID for our Lambda function. You can find it at the top right in the UI of your AWS Lambda function you created earlier. After you're done with that click on Next.

	
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/018-connect-to-lambda.png" width="50%">
</p>
	Now we're almost done. Lastly we need to add the Alexa App ID as Environment Variable to our Lambda function. For that copy the Alexa Skill ID at the top of the Alexa Console and go back to your Lambda function.
<p>
	
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/019-get-app-id.png" width="50%">
</p>

<p>
	Within your Lambda function scroll down until where you can add Environment variables. Add the one variable with the key "appId" and the Alexa Skill ID you copied before as value.

	Now you're done and can test the skill.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/020-set-appid-in-env-var.png" width="50%">
</p>

<p>
	To test if everything works click on "Test" within your Lambda function. A pop up window opens and search for "Alexa Start Session" from the "Sample event template" dropdown. Replace the applicationId with your Alexa Skill ID. There are two entries so make sure you update both.

	When you're done click on "Save and test".
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/021-lambda-test-session-start-event.png" width="50%">
</p>

<p>
	If all worked out you should see a message confirming that the execution result succeeded.
</p>
<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/022-lambda-success.png" width="50%">
</p>

<p>
	If you want to test the app more thoroughly go back to the Alexa Skill Kit configuration at the Amazon Developer Console. It should still be open if you haven't closed this window before. Otherwise you can find it within your Alexa Skill on the left hand side under "Test".

	You need to first open the app by saying something like "Alexa open YOUR_INVOCATION_NAME" or simply "Start YOUR_INVOCATION_NAME". After that you're ready to ask your skill questions about your pension. 
</p>

<p align="center">
<img src="https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/023-test-interface.png" width="50%">
</p>

<p>
	When you reached this stage and you own an Amazon Echo or Echo Dot you can test it on your device. Given that you developed the skill with the same amazon accounts.

	That's it. Enjoy!
</p>
