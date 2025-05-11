import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const RenameTeamByIdOrSlugReqBodySchema = z.object({
  name: z.string().min(1),
});

export const RenameTeamByIdOrSlugReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const RenameTeamResSchema = z.object({
  name: z.string(),
  slug: z.string(),
  id: z.string(),
  ownerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
