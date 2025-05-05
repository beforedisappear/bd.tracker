import { z } from 'zod';

import {
  REQUIRED_FIELD_MESSAGE,
  INCORRECT_VALUE_FIELD_MESSAGE,
} from '@/shared/constants';

export const AuthFirstStepSchema = z.object({
  email: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, REQUIRED_FIELD_MESSAGE)
    .email(INCORRECT_VALUE_FIELD_MESSAGE),
});

export const AuthSecondStepSchema = z.object({
  code: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
      invalid_type_error: INCORRECT_VALUE_FIELD_MESSAGE,
    })
    .length(6, REQUIRED_FIELD_MESSAGE),
});
