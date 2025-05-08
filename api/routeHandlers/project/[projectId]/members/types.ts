import {
  GetProjectMembersReqParamsSchema,
  GetProjectMembersReqQuerySchema,
  GetProjectMembersResSchema,
  PostAddProjectMemberReqBodySchema,
  PostAddProjectMemberReqParamsSchema,
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

export type PostAddProjectMemberReqParamsDto = z.infer<
  typeof PostAddProjectMemberReqParamsSchema
>;

export type PostAddProjectMemberReqBodyDto = z.infer<
  typeof PostAddProjectMemberReqBodySchema
>;
