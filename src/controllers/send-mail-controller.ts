import { validate, ValidationError } from 'class-validator';
import { Errors, Path, POST, Return } from 'typescript-rest';
// import { EmailSendQueueHandler } from '../handlers/send-emails-task-queue';
// import { Inject } from 'typescript-ioc';
import { log } from '../api-server';
import { handlesending } from '../handlers/send-emails-simple-handler';
import { EmailData } from '../models/email-model';

/**
 * This is the main send email REST controller class.
 */
@Path('/email-sender')
export class EmailSendController {

    // TODO: add queue task handlin implementation when ready.
    // @Inject
    // private injectedHandler: EmailSendQueueHandler;

    /**
     * Send email via queue to email gateways.
     * @return 200 OK header or 404 error message
     */
    @Path('email')
    @POST
    public sendEmail(data: EmailData) {

        return validate(data).then((errors: Array<ValidationError>) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                throw new Errors.BadRequestError('Bad request data format for email sending. ' + message);
            } else {
                log.info("Sending email to: " + data.to + " from: " + data.from + " Subject: " + data.subject);
                handlesending(data);
                return new Return.RequestAccepted('au');
            }
        });
    }

}