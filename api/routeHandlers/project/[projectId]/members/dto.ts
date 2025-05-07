import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const GetProjectMembersReqParamsSchema = z.object({
  projectId: z.string(),
});

export const GetProjectMembersReqQuerySchema = z.object({
  keyword: z.string().optional(),
});

export const GetProjectMembersResSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  email: z.string().email(),
});
