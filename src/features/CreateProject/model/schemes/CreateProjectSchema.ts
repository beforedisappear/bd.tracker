import { z } from 'zod';

import { REQUIRED_FIELD_MESSAGE } from '@/shared/constants';

export const CreateProjectSchema = z.object({
  name: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, REQUIRED_FIELD_MESSAGE),
  membersIds: z.record(z.string(), z.boolean()),
});
