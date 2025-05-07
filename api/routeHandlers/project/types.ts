import { z } from 'zod';
import {
  CreateProjectReqBodySchema,
  GetAllTeamProjectsReqQuerySchema,
} from './dto';

export type CreateProjectReqDto = z.infer<typeof CreateProjectReqBodySchema>;
export type GetAllTeamProjectsReqQueryDto = z.infer<
  typeof GetAllTeamProjectsReqQuerySchema
>;
