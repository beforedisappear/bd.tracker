import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const GetTeamMembersReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const GetTeamMembersReqQuerySchema = z.object({
  keyword: z.string().optional(),
});

export const GetTeamMembersResSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string().nullable(),
    email: z.string().email(),
    createdAt: z.string(),
    updatedAt: z.string(),
    isOwner: z.boolean(),
    isAdmin: z.boolean(),
  }),
);
