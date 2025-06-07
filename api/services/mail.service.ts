import 'server-only';

import nodemailer, { Transporter } from 'nodemailer';
import { ApiError } from 'api/errors/apiError';

import type {
  EmailOptions,
  IAuthMail,
  IInvitationMail,
  IProposalMail,
  ChangeEmailMail,
} from '../types';

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

  async sendAuthMail({ email, code }: IAuthMail) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`sendAuthMail service: send to ${email} code ${code}`);
      return;
    }

    return this.sendMail({ to: email, text: code });
  }

  async sendProposalOfInvitationMail(props: IInvitationMail) {
    const { email, teamName, invitationId, token } = props;

    const message = `Команда ${teamName} приглашает тебя присоединиться. Для этого перейди по ссылке - ${process.env.NEXT_PUBLIC_URL}/invite?invitationId=${invitationId}&token=${token}`;

    return this.sendMail({
      to: email,
      text: message,
    });
  }

  async sendNotificationOfInvitationMail(props: IProposalMail) {
    const { teamName, email } = props;

    const message = `Вы были добавлены в команду. Для просмотра перейдите по ссылке - ${process.env.NEXT_PUBLIC_URL}/${teamName}/profile`;

    return this.sendMail({
      to: email,
      text: message,
    });
  }

  async sendChangeEmailMail(props: ChangeEmailMail) {
    const { newEmail, token, requestId } = props;

    const message = `Добрый день! Для изменения почты перейдите по ссылке - ${process.env.NEXT_PUBLIC_URL}/email-change?token=${token}&requestId=${requestId}`;

    return this.sendMail({
      to: newEmail,
      text: message,
    });
  }

  private async sendMail(options: EmailOptions): Promise<void> {
    const { from = process.env.SMTP_SERVICE_LOGIN, ...rest } = options;

    try {
      const info = await this.transporter.sendMail({ from, ...rest });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw ApiError.internal('Failed to send email');
    }
  }
}

export const mailService = new MailService();
