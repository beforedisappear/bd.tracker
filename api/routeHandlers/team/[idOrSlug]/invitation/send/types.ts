import { z } from 'zod';
import {
  InviteUserToTeamReqBodySchema,
  InviteUserToTeamReqParamsSchema,
} from './dto';

export type InviteUserToTeamReqDto = z.infer<
  typeof InviteUserToTeamReqBodySchema
>;

export type InviteUserToTeamReqParams = z.infer<
  typeof InviteUserToTeamReqParamsSchema
>;
