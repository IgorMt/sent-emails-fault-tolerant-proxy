
import { EmailData } from '../models/email-model';

/**
 * Common interface for email senders.
 */
export interface SendEmailBase {
    sendEmail(data: EmailData): String;
}