import { MailgunEmailSender }  from './send-email-mailgun';
import { SendGridEmailSender }  from './send-email-sendgrid';

export default [
    MailgunEmailSender,
    SendGridEmailSender
  ];