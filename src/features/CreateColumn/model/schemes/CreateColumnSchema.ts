import { REQUIRED_FIELD_MESSAGE } from '@/shared/constants';
import { z } from 'zod';

export const CreateColumnSchema = z.object({
  name: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, REQUIRED_FIELD_MESSAGE),
});
