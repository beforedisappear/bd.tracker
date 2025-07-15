import { z } from 'zod';

export const TeamMembersFieldSchema = z.object({
  all: z.boolean().optional(),
  membersIds: z.record(z.string().uuid(), z.boolean()),
});
