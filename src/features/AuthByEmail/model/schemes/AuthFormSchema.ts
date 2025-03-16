import { z } from 'zod';

import {
  REQUIRED_FIELD_MESSAGE,
  INCORRECT_VALUE_FIELD_MESSAGE,
} from '@/shared/constants';

export const AuthFormFirstStepSchema = z.object({
  email: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, INCORRECT_VALUE_FIELD_MESSAGE)
    .email(),
});

export const AuthFormSecondStepSchema = z.object({
  code: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .length(6, INCORRECT_VALUE_FIELD_MESSAGE),
});

type AuthFormFirstStepValues = z.infer<typeof AuthFormFirstStepSchema>;
type AuthFormSecondStepValues = z.infer<typeof AuthFormSecondStepSchema>;

export type AuthFormValues = AuthFormFirstStepValues | AuthFormSecondStepValues;
