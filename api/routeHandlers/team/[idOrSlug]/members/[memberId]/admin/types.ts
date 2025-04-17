import { z } from 'zod';
import {
  RemoveTeamAdminReqParamsSchema,
  SetTeamAdminReqParamsSchema,
} from './dto';

export type SetTeamAdminReqParams = z.infer<typeof SetTeamAdminReqParamsSchema>;

export type RemoveTeamAdminReqParams = z.infer<
  typeof RemoveTeamAdminReqParamsSchema
>;
