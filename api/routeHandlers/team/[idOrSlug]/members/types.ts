import { z } from 'zod';
import {
  GetTeamMembersReqParamsSchema,
  GetTeamMembersReqQuerySchema,
} from './dto';

export type GetTeamMembersReqParams = z.infer<
  typeof GetTeamMembersReqParamsSchema
>;

export type GetTeamMembersReqQuery = z.infer<
  typeof GetTeamMembersReqQuerySchema
>;
