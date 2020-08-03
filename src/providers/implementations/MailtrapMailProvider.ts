import "dotenv/config";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
      },
    });
  }
  async sendMail(mailInfo: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: mailInfo.to.name,
        address: mailInfo.to.email,
      },
      from: {
        name: mailInfo.from.name,
        address: mailInfo.from.email,
      },
      subject: mailInfo.subject,
      html: mailInfo.body,
    });
  }
}
