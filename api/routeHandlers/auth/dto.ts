import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const AuthReqBodySchema = z
  .object({
    email: z.string().email(),
  })
  .openapi({
    param: { content: {}, in: 'path' },
    example: { email: 'roman23kl@gmail.com' },
  });
