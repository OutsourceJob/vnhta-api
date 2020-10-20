import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from '../../config/index';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }

  public sendConfirmRegisterEmail(email: string): void {
    this
      .mailerService
      .sendMail({
        to: email,
        from: config.EMAIL,
        subject: 'Testing Nest MailerModule ✔',
        html: '<b>welcome</b>',
      })
      .then(() => { })
      .catch(() => { });
  }
}
