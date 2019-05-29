import * as Queue from 'better-queue';
// import { Inject } from 'typescript-ioc';
import { EmailData } from '../models/email-model';
// import { MailgunEmailSender } from '../services/send-email-mailgun';
// import { SendGridEmailSender } from '../services/send-email-sendgrid';

// import { mgsendemail } from '../services/send-email-mailgun';
import { sgsendemail } from '../services/send-email-sendgrid';

/**
 * This queuing and handling the send emails jobs
 * There in use the "better-queue" for standalone demo,
 * in a real app is better to use 
 * SQS(if use in AWS), Kue(Redis), RabbitMQ or others with persisting data. 
 */
export class EmailSendQueueHandler {

    // Inject email senders.
    // @Inject
    // private mailgun: MailgunEmailSender;

    // @Inject
    // private sendgrid: SendGridEmailSender;

    private q: Queue = new Queue(() => {'queue';}, { maxTimeout: 5000 });

    /**
     * Send email via task queue to email gateways.
     * @return success or error message
     */
    public pushEmail(data: EmailData): string {

        this.q.push(sgsendemail(data)).on( 'finish', (result) => {
            // TODO: Task succeeded with {result}!
          })
          .on('failed', function (err) {
            // TODO: Task failed, send with Mailgun, if wrong holds it in queue for the next iteration.
          });

        return "Email send task queued. " + this.q.getStats;
    }

}