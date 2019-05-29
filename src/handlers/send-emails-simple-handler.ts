import {log} from '../api-server';
import { EmailData } from '../models/email-model';
import { mgsendemail } from '../services/send-email-mailgun';
import { sgsendemail } from '../services/send-email-sendgrid';

/**
 * This simple handling to send emails for standalone demo,
 * in a real app is better to use  SQS(if use in AWS), Kue(Redis), RabbitMQ 
 * or others for queueing'and persisting data. 
 */
export function handlesending(data: EmailData) {

    sgsendemail(data).then(([response]) => {

        if (response.statusCode !== 200 && response.statusCode !==202) {
            log.warn("SendGrid sending fail. " + response.statusCode + " " + response.statusMessage);
            mgsendemail(data).then(resp => {

                if (resp.message === 'Accepted') {
                    log.info("Messagegun sending succeed. " + resp.message);
                     return resp.message;
                }
                log.error("Failed the sending email to: " + data.to + " from: " + data.from + " Subject: " + data.subject);
                return resp.message;

            });
            return ;
        } else {
            log.info("SendGrid sending succeeed. " + response.statusCode + " " + response.statusMessage);
        }
    });


}