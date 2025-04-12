import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const GetTeamMembersReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const GetTeamMembersResSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  email: z.string().email(),
});
