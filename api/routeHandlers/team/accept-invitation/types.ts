import { z } from 'zod';
import { AcceptInvitationToTeamReqQuerySchema } from './dto';

export type AcceptInvitationToTeamReqQuery = z.infer<
  typeof AcceptInvitationToTeamReqQuerySchema
>;
