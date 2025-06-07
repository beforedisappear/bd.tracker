import { z } from 'zod';

export const ManageProjectMembersSchema = z.object({
  membersIds: z.record(z.string().uuid(), z.boolean()),
  keyword: z.string().optional(),
});
