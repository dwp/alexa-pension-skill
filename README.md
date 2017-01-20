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

[001]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/001-aws-lambda.png | 250x
[002]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/002-create-lambda-function.png {: width="400px"}
[003]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/003-blueprints.png {: width="400px"}
[005]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/005-triggers.png {: width="400px"}
[006]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/006-triggers.png {: width="400px"}
[007]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/007-config-function.png {: width="400px"}
[008]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/008-iam-role.png {: width="400px"}
[009]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/009-create-iam-role.png {: width="400px"}
[010]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/010-choose-role.png
[011]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/011-create-function-finish.png
[012]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/012-upload-zip.png

![001]

![002]

![003]

![005]

![006]

![007]

![008]

![009]

![010]

![011]

![012]

# Setting up the Alexa-Skill-kit
[013]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/013-alexa-skills.png
[014]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/014-alexa-skills-kit.png
[015]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/015-create-new-skill.png
[016]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/016-config-interaction-model.png
[017]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/017-custom-slot-type.png
[018]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/018-connect-to-lambda.png
[019]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/019-get-app-id.png
[020]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/020-set-appid-in-env-var.png
[021]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/021-lambda-test-session-start-event.png
[022]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/022-lambda-success.png
[023]: https://github.com/dwpdigitaltech/alexa-pension-skill/blob/master/screenshots/023-test-interface.png

![013]

![014]

![015]

![016]

![017]

![018]

![019]

![020]

![021]

![022]

![023]
# Testing
Echoism.io
On alexa
Local Lambda testing with Events
