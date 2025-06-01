import type {
  UpdateProjectMembersReqParamsSchema,
  UpdateProjectMembersReqBodySchema,
} from './dto';
import { z } from 'zod';

export type UpdateProjectMembersReqParamsDto = z.infer<
  typeof UpdateProjectMembersReqParamsSchema
>;

export type UpdateProjectMembersReqBodyDto = z.infer<
  typeof UpdateProjectMembersReqBodySchema
>;
