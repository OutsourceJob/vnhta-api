import { Injectable } from '@nestjs/common';
import { config } from '../../config/index';
import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as hogan from "hogan.js";
import * as path from "path";

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

  public sendConfirmRegisterEmail(email: string, pin: string): void {
    const transporter = this.createTransporter();
    const templatePath = path.join(__dirname, "../../../templates/register.template.hjs")
    const template = fs.readFileSync(templatePath, "utf-8")
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
      console.log("sendConfirmRegisterEmail Success")
    })
  }

  public sendPinViaEmail(email: string, pin: string): void {
    const transporter = this.createTransporter();
    const templatePath = path.join(__dirname, "../../../templates/send-pin.template.hjs")
    const template = fs.readFileSync(templatePath, "utf-8")
    const compiledTemplate = hogan.compile(template);
    const mailOptions = {
      from: config.EMAIL,
      to: email,
      subject: "VNHTA - New pin",
      html: compiledTemplate.render({
        pin
      })
    }

    transporter.sendMail(mailOptions, err => {
      if (err) return console.log(err)
      console.log("sendPinViaEmail Success")
    })
  }

  public resetPassword(email: string, newPassword: string): void {
    const transporter = this.createTransporter();
    const templatePath = path.join(__dirname, "../../../templates/reset-password.template.hjs")
    const template = fs.readFileSync(templatePath, "utf-8")
    const compiledTemplate = hogan.compile(template);
    const mailOptions = {
      from: config.EMAIL,
      to: email,
      subject: "VNHTA - Reset password",
      html: compiledTemplate.render({
        password: newPassword
      })
    }

    transporter.sendMail(mailOptions, err => {
      if (err) return console.log(err)
      console.log("resetPassword Success")
    })
  }
}
