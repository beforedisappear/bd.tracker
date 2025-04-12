import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const LogoutReqBodySchema = z.object({
  refreshToken: z.string().uuid(),
});
