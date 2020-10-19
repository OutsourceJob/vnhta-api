import * as nodemailer from "nodemailer";
import { AccountEntity } from "../modules/account/account.entity";

export const sendEmail = async (account: AccountEntity) => {
   console.log("account", account);

   // Generate test SMTP service account from ethereal.email
   // Only needed if you don't have a real mail account for testing
   let testAccount = await nodemailer.createTestAccount();
   console.log("testAccount", testAccount);

   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
         user: account.email, // generated ethereal user
         pass: testAccount.pass, // generated ethereal password
      },
   });

   // send mail with defined transport object
   let info = await transporter.sendMail({
      from: 'VNHTA DATA', // sender address
      to: `${account.email}`, // list of receivers
      subject: "Activate account", // Subject line
      text: `
         <div>
            <p>Click follow link for activate account</p>
            <a href="/">Move to Activation page!</a>
         </div>
      `,
      html: `
         <div>
            <p>Click follow link for activate account</p>
            <a href="/">Move to Activation page!</a>
         </div>`,
   });

   console.log("Message sent: %s", info.messageId);
   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

   // Preview only available when sending through an Ethereal account
   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}