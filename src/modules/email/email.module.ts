//app.module.ts
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { } from "../../config"
import { EmailService } from './email.service';

@Module({
  imports: [],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule { }