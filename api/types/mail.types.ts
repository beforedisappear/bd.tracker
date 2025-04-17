import Mail from 'nodemailer/lib/mailer';

export type EmailOptions = Mail.Options;

interface BaseMailProps {
  email: string;
}

export interface IAuthMail extends BaseMailProps {
  code: string;
}

export interface IInvitationMail extends BaseMailProps {
  invitationId: string;
  token: string;
  teamName: string;
}

export interface IProposalMail extends BaseMailProps {
  teamName: string;
}
