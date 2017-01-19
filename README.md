# alexa-pension-skill
This is an Alexa skill that lets users find out what their pension age in the UK is. The goal of this project was to experiment with Alexa and to find out how to implement a multi-turn Alexa skill.

We're using the [alexa-SDK for nodejs ](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs "alexa-SDK for nodejs "). Amazon also has a [Java SDK](https://github.com/amzn/alexa-skills-kit-java "SDK for Java") and [python / Flask SDK](https://github.com/amzn/alexa-skills-kit-java "python / Flask SDK"). All SDKs can be run on AWS Lambda. Lambda is an AWS service that let you directly run functions in the cloud without running or managing a server. Hereby you only pay for the time your function runs.


# Preparing for upload to Lambda
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

Lambda has an online editor where you can write or paste the functions you want to run. If your code has dependcies or need other local resources (e.g. file with json or XML) you can zip and upload it to AWS. If your unzipped package size is bigger than 10mb you won't be able to edit and update the code in the editor.

> NOTE!
> It's important that the index.js is in root directory of the zip.
> You can do this by executing following command while being in the project folder
```
zip -r -D alexa-pension-skill-lambda.zip *
```


# code
In our example we have to convert date strings to date objects. Unfortunately  for which we're using the momentjs library. momentjs gives us more convenient API for date transformations than pure javscript including converting date strings to `Date` objects. 
```javascript
var Alexa = require('alexa-sdk');
var moment = require('moment'); 
```


# The Voice Interface
Amazon's
The folder speech_assets has two files. One with the intent schema 

When you export the project for AWS Lambda make sure you zip the files including following files and folders

# Preparing the project for AWS Lambda
```
index.js
node_modules
data
```


```
cd YourProjectDirectory
zip -r -D zipped.zip *
```
