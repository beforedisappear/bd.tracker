import { RemoveProjectMemberReqParamsSchema } from './dto';
import { z } from 'zod';

export type RemoveProjectMemberReqParamsDto = z.infer<
  typeof RemoveProjectMemberReqParamsSchema
>;
