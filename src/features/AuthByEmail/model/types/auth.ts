import { z } from 'zod';
import { AuthFirstStepSchema, AuthSecondStepSchema } from '../schemes';

export type AuthDtoReq = {
  email: string;
};

export type AuthDtoRes = unknown;

type AuthFormFirstStepValues = z.infer<typeof AuthFirstStepSchema>;
type AuthFormSecondStepValues = z.infer<typeof AuthSecondStepSchema>;

export type AuthFormValues = AuthFormFirstStepValues | AuthFormSecondStepValues;
