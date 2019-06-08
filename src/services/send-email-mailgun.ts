import * as mailgun from 'mailgun-js';
import { EmailData } from '../models/email-model';
import { SendEmailBase } from './send-email-base';

// TODO: all parameters must be centralized in separate config service or db.
const DOMAIN = 'abcdef.mailgun.org';
const APIKEY = 'abcdef';

const mg = mailgun({ apiKey: APIKEY, domain: DOMAIN });


export async function mgsendemail(data: EmailData) {
  return mg.messages().send(data);
}

/**
 * This class send email via mailgun
 */
export class MailgunEmailSender implements SendEmailBase {

  public sendEmail(data: EmailData): String {
    mg.messages().send(data).then((response) => {
      return response.message;
    });
    return 'finish';
  }

}