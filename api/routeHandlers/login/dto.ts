import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const LoginReqBodySchema = z
  .object({
    email: z.string().email(),
    code: z.string().min(6).max(6),
  })
  .openapi({
    param: { content: {}, in: 'path' },
    example: { email: 'roman23kl@gmail.com', code: '123456' },
  });

export const LoginResSchema = z
  .object({
    refreshToken: z.string().uuid(),
    accessToken: z.string().jwt(),
    exp: z.date(),
  })
  .openapi({
    param: { content: {}, in: 'path' },
    example: {
      refreshToken: 'd70cffe9-4820-4f07-aba1-ae988e3308f6',
      accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI3MGMzYmQ0Yy1lOWI4LTRjYzgtYjllZC00NmM1ZWMyYjkxNjIiLCJlbWFpbCI6InJvbWFuMjNrbEBnbWFpbC5jb20iLCJpYXQiOjE3Mzc2NDE0NTYsImV4cCI6MTczNzY0MTc1Nn0.Q9xdUfa_0dUa4MJrhcfZ3Bm4B8xXrC4sAXn3WDeC7VE',
      exp: new Date(),
    },
  });
