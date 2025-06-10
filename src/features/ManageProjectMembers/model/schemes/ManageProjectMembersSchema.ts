import { z } from 'zod';

import { TeamMembersFieldSchema } from '@/entities/Team';

export const ManageProjectMembersSchema = TeamMembersFieldSchema.extend({
  keyword: z.string().optional(),
});
