import { Injectable } from '@nestjs/common';
import { config } from '../../config/index';
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as hogan from "hogan.js";

@Injectable()
export class EmailService {
  constructor() { }

  createTransporter() {
    const transport = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      requireSSL: true,
      auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASSWORD
      }
    }
    const transporter = nodemailer.createTransport(transport)
    return transporter
  }

  public sendConfirmRegisterEmail(email: string, pin: number): void {
    const transporter = this.createTransporter();
    const template = fs.readFileSync(`${__dirname}/sendBookTicketEmail.hjs`, "utf-8")
    const compiledTemplate = hogan.compile(template);
    const mailOptions = {
      from: config.EMAIL,
      to: email,
      subject: "VNHTA - Activate your account",
      html: compiledTemplate.render({
        pin
      })
    }

    transporter.sendMail(mailOptions, err => {
      if (err) return console.log(err)
      console.log("Success")
    })
  }
}
