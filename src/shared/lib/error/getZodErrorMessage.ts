import { ZodError } from 'zod';

export const getZodErrorMessage = (error: ZodError) => {
  const firstError = error.errors[0];
  return firstError?.message;
};
