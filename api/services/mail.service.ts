import 'server-only';

import nodemailer, { Transporter } from 'nodemailer';

import type { EmailOptions } from '../types';

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVICE_HOST,
      port: Number(process.env.SMTP_SERVICE_PORT),
      secure: process.env.SMTP_SERVICE_SECURE === 'true',
      auth: {
        user: process.env.SMTP_SERVICE_LOGIN,
        pass: process.env.SMTP_SERVICE_PASS,
      },
    });
  }

  async sendAuthMail({ email, code }: { email: string; code: string }) {
    return this.sendMail({ to: email, text: code });
  }

  private async sendMail(options: EmailOptions): Promise<void> {
    const { from = process.env.SMTP_SERVICE_LOGIN, ...rest } = options;

    try {
      const info = await this.transporter.sendMail({ from, ...rest });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}

export const mailService = new MailService();

// Пример использования MailService
// (async () => {
//   const mailService = new MailService();

//   try {
//     await mailService.sendAuthMail({
//       from: 'your-email@example.com',
//       to: 'roman23kl@gmail.com',
//       subject: 'Test Email',
//       text: 'Hello, this is a test email sent from Node.js using Nodemailer!',
//       html: '<h1>Hello</h1><p>This is a test email sent from Node.js using Nodemailer!</p>',
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// })();
