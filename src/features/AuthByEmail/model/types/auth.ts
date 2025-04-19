import { z } from 'zod';
import { AuthFormFirstStepSchema, AuthFormSecondStepSchema } from '../schemes';

export type AuthDtoReq = {
  email: string;
};

type AuthFormFirstStepValues = z.infer<typeof AuthFormFirstStepSchema>;
type AuthFormSecondStepValues = z.infer<typeof AuthFormSecondStepSchema>;

export type AuthFormValues = AuthFormFirstStepValues | AuthFormSecondStepValues;
