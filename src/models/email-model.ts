
import { IsEmail, Length } from 'class-validator';

/**
 * Email data model class
 */
export class EmailData {

  @IsEmail()
  public to: string;

  @IsEmail()
  public from: string;

  @IsEmail()
  public cc: string;

  @IsEmail()
  public bcc: string;

  @Length(255)
  public subject: string;

  @Length(3000)
  public text: string;

}