[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
[001]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/001-aws-lambda.png
[002]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/002-create-lambda-function.png

![alt text][001]
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

What files do you need to zip:

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


# The Voice Interface
Amazon's
The folder speech_assets has two files. One with the intent schema 



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
# Uploading Code to AWS Lambda

# Setting up the Alexa-Skill-kit

# Testing
Echoism.io
On alexa
Local Lambda testing with Events
