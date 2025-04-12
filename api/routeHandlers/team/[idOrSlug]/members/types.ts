import { z } from 'zod';
import { GetTeamMembersReqParamsSchema } from './dto';

export type GetTeamMembersReqParams = z.infer<
  typeof GetTeamMembersReqParamsSchema
>;
