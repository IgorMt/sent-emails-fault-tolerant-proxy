import * as mailgun from 'mailgun-js';
import { EmailData } from '../models/email-model';
import { SendEmailBase } from './send-email-base';

// TODO: all parameters must be centralized in separate config service or db.
const DOMAIN = 'sandbox01b5cdf850c84777807ca495289fbded.mailgun.org';
const APIKEY = '4c31ae4623108c12e5579cbe18cdfccf-52b0ea77-86e50ac9';

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