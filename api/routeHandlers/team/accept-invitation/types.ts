import { z } from 'zod';
import { AcceptInvitationToTeamReqBodySchema } from './dto';

export type AcceptInvitationToTeamReqBody = z.infer<
  typeof AcceptInvitationToTeamReqBodySchema
>;
