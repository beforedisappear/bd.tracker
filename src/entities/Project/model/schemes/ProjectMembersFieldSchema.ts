import { z } from 'zod';

export const ProjectMembersFieldSchema = z.object({
  membersIds: z.record(z.string(), z.boolean()),
});
