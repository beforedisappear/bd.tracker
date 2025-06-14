import { z } from 'zod';

import { REQUIRED_FIELD_MESSAGE } from '@/shared/constants';

import { TeamMembersFieldSchema } from '@/entities/Team';

export const CreateProjectSchema = TeamMembersFieldSchema.extend({
  name: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, REQUIRED_FIELD_MESSAGE),
});
