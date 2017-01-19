# alexa-pension-skill
This is an Alexa skill that lets users find out what their pension age in the UK is. The goal of this project was to experiment with Alexa and to find out how to implement a multi-turn Alexa skill. We

The Alexa SDK from Amazon that we're using for writing Alexa skills is written in nodejs which will be the language for this project. Amazon also has a SDK [I'm an inline-style link with title](https://www.google.com "SDK for Java")
and there are unofficial alexa SDKs for python.
Alexa skills run on Amazon AWS Lambda. Which is an AWS service that let you directly run functions in the cloud without running or managing a server. Hereby you only pay for the time your function runs.

This tutorial assumes you already have git installed as well as nodejs including NPM. If you don't, then start by installing nodejs and git.

To get started download the repository
```
git clone git@github.com:dwpdigitaltech/alexa-pension-skill.git
```

Then open the folder and install the project dependencies with npm.
```
cd alexa-pension-skill
npm install
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
