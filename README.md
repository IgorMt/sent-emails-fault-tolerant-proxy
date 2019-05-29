## Sent emails fault-tolerant proxy
 
This application provides an abstraction between two email service providers – 
SendGrid and Mailgun. If one service in down, the application sends emails from the other one. 
 
## Prerequisites
 
- NodeJS version: v10.14.1
- npm version: 6.4.1
 
## Implementation details

Application consists of 3 modules: controllers, handlers and services.

- controllers on this moment holds one EmailSendController typescript class holds   public sendEmail(data: EmailData){...} where EmailData is JSON request body model. With http POST request this method get data, then validate it and call the send email handler.
- handlers holds two mail typescript files emails-simple-handler.ts and send-emails-task-queue.ts. Currently using just emails-simple-handler.ts which implements a simple logic to send, at first trying to send via SendGrid, if error - sendin via mailgun. send-emails-task-queue.ts is for further QUEUE implementation, see TODO chapter below.
- services holds functionality to send emails via SendGrid and Mailgun. 

## Getting started
 
Application Installation
 
Copy application folder locally from GitHub.

run npm install

run npm start or npm run start-server(if need edit code with nodemon) 
 
Use REST client e.g. Postman.
 
Local link to the email service: http://127.0.0.1:3000/email-sender/email

Add Header: Content-Type: application/json

Send method: POST

Use body like(to, cc and bcc must be different!):

{
"to": "test@gmail.com",
"cc":"test_1@gmail.com",
"bcc":"test_2@eml.cc",
"from": "test@gmail.com",
"subject": "Test Subject",
"text": "Test Body."
}
 
Once an email has been successfully sent, the response arrives containing the code '202 Accepted' and the word ‘Accepted’ in the body.
 
# Other commands

- Build: npm run build

- Clean: npm run clean

- Lint: npm run lint

- Lint fix: npm run lint:fix

- Swagger Docs Generation: npm run swagger

- Pre-Test: npm run pretest
 
- Test: npm run test
 
- Test with coverage reports: npm run test:coverage
 
## Tests
 
Use 'npm run test' command
 
## TODO:
- implement the QUEUE layer to unbind the client request from the email sending process (will be repeated if something has gone wrong). Use MQ services like active MQ like RubbitMQ for servers or SQS(if planning for AWS). 
- centralise configuration for application in the DB specifically for each env: dev, test, integration, stages, prod.
- add the function of quick module addition (modules with different email services)
- create docker image or use AWS Serverless Lambda to simplify migrations 
- run tests for all services
- secure access keys
 
## Copyright
 
I. Maltsev
29/05/2019
 

