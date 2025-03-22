import { z } from 'zod';

import {
  INCORRECT_VALUE_FIELD_MESSAGE,
  REQUIRED_FIELD_MESSAGE,
} from '@/shared/constants';

export const ReceiveNewsFormSchema = z.object({
  email: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, INCORRECT_VALUE_FIELD_MESSAGE)
    .email(),
});

export type ReceiveNewsFormValues = z.infer<typeof ReceiveNewsFormSchema>;
