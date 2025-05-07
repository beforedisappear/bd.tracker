import {
  GetProjectMembersReqParamsSchema,
  GetProjectMembersReqQuerySchema,
  GetProjectMembersResSchema,
} from './dto';
import { z } from 'zod';

export type GetProjectMembersReqParamsDto = z.infer<
  typeof GetProjectMembersReqParamsSchema
>;

export type GetProjectMembersReqQueryDto = z.infer<
  typeof GetProjectMembersReqQuerySchema
>;

export type GetProjectMembersResDto = z.infer<
  typeof GetProjectMembersResSchema
>;
