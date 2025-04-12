import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const GetTeamByIdOrSlugReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const DeleteTeamByIdOrSlugReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const GetTeamByIdOrSlugResSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  ownerId: z.string(),
});

export const DeleteTeamByIdOrSlugResSchema = z.object({
  idOrSlug: z.string(),
});
