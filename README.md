## Sent emails fault-tolerant proxy
 
This application provides an abstraction between two email service providers – 
SendGrid and Mailgun. If one service in down, the application sends emails from the other one. 
 
## Prerequisites
 
- NodeJS version: v10.14.1
- npm version: 6.4.1
 
## Getting started
 
Application Installation
 
Copy application folder locally from GitHub.

run npm install

run npm start or npm run start-server(if need edit code with nodemon) 
 
Use REST client e.g. Postman.
 
Local link to the email service: http://127.0.0.1:3000/email-sender/email

Add Header: Content-Type: application/json

Send method: POST

Use body like:

{
"to": "test@gmail.com",
"cc":"test@gmail.com",
"bcc":"test@eml.cc",
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
- run tests for all services
 
## Copyright
 
I. Maltsev
29/05/2019
 

