import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const RenameTeamByIdOrSlugReqBodySchema = z.object({
  name: z.string(),
});

export const RenameTeamByIdOrSlugReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const RenameTeamResSchema = z.object({
  name: z.string(),
});
