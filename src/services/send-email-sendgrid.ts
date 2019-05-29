import * as SendGrid from "@sendgrid/mail";
import { EmailData } from '../models/email-model';
import { SendEmailBase } from './send-email-base';

// TODO: all parameters must be centralized in separate config service or db.
SendGrid.setApiKey("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");

// Here needs to convert value to the actual MailService using type, specifically to ts.
interface Foo {
    mail: typeof SendGrid.MailService;
}

const foo: Foo = {
    mail: SendGrid
};

export function sgsendemail(data: EmailData) {
    return foo.mail.send(data);
}

/**
 * This class send email via SendGrid
 */
export class SendGridEmailSender implements SendEmailBase {

    public sendEmail(data: EmailData): string {
        foo.mail.send(data).then(([response, body]) => {
            return response.statusCode.toString();
        });
        return 'finish';
    }

}