import { z } from 'zod';

export const authDataSchema = z.object({
  email: z.string().email(),
});

export const loginDataSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(6),
});

export const logoutDataSchema = z.object({
  refreshToken: z.string().uuid(),
});

export const refreshTokensSchema = logoutDataSchema;
