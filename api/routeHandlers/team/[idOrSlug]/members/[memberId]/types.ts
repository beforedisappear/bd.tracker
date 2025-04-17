import { z } from 'zod';
import {
  GetTeamMemberByIdReqParamsSchema,
  GetTeamMemberByIdResSchema,
  RemoveTeamMemberByIdReqParamsSchema,
} from './dto';

export type GetTeamMemberByIdReqParams = z.infer<
  typeof GetTeamMemberByIdReqParamsSchema
>;

export type GetTeamMemberByIdResDto = z.infer<
  typeof GetTeamMemberByIdResSchema
>;

export type RemoveTeamMemberByIdReqParams = z.infer<
  typeof RemoveTeamMemberByIdReqParamsSchema
>;
