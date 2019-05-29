'use strict';

import * as chai from 'chai';
import { after, before, describe, it } from 'mocha';
import * as request from 'request';
import { HttpMethod, Server } from 'typescript-rest';
import { ApiServer } from '../src/api-server';

const expect = chai.expect;

const apiServer: ApiServer = new ApiServer();
const sendEmail: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
    = request.defaults({ baseUrl: `http://localhost:${apiServer.PORT}` });

describe('Send emails Tests', () => {

    before(() => {
        return apiServer.start();
    });

    after(() => {
        return apiServer.stop();
    });

    describe('Check Server path', () => {
        it('to check path', () => {
            expect(Server.getPaths()).to.include.members([
                '/email-sender/email',
            ]);
            expect(Server.getHttpMethods('/email-sender/email')).to.have.members([HttpMethod.POST]);
        });
    });

    describe('should return 405 for GET requests', () => {
        it('should return 405 on get request', (done) => {
            sendEmail('/email-sender/email', (error: any, response, body) => {
                expect(response.statusCode).to.eq(405);
                done();
            });
        });

        it('should return 202 for POST requests', (done) => {
            sendEmail.post({
                body: {
                    "bcc": "itest@gmail.com",
                    "cc": "test@gmail.com",
                    "from": "test@gmail.com",
                    "subject": "Test",
                    "text": "Test.",
                    "to": "test@gmail.com"
                },
                url: '/email-sender/email'
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(202);
                done();
            });
        });
    });

});
