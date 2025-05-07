import { z } from 'zod';

export const RemoveProjectMemberReqParamsSchema = z.object({
  projectId: z.string(),
  memberId: z.string(),
});
