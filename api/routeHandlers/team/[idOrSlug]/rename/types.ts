import { z } from 'zod';
import {
  RenameTeamByIdOrSlugReqBodySchema,
  RenameTeamByIdOrSlugReqParamsSchema,
} from './dto';

export type RenameTeamReqDto = z.infer<
  typeof RenameTeamByIdOrSlugReqBodySchema
>;

export type RenameTeamByIdOrSlugReqParams = z.infer<
  typeof RenameTeamByIdOrSlugReqParamsSchema
>;
