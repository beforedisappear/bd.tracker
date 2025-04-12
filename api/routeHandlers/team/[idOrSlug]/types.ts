import { z } from 'zod';
import {
  DeleteTeamByIdOrSlugReqParamsSchema,
  GetTeamByIdOrSlugReqParamsSchema,
} from './dto';

export type GetTeamByIdOrSlugReqParams = z.infer<
  typeof GetTeamByIdOrSlugReqParamsSchema
>;

export type DeleteTeamReqParams = z.infer<
  typeof DeleteTeamByIdOrSlugReqParamsSchema
>;
