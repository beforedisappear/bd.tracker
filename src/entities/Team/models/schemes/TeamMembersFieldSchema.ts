import { z } from 'zod';

export const TeamMembersFieldSchema = z.object({
  membersIds: z.record(z.string().uuid(), z.boolean()),
});
