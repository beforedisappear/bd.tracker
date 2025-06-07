import { z } from 'zod';

export const UpdateProjectMembersReqParamsSchema = z.object({
  projectId: z.string(),
});

export const UpdateProjectMembersReqBodySchema = z.object({
  membersIds: z.array(z.string()),
});
