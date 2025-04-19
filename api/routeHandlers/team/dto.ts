import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const CreateTeamReqBodySchema = z.object({
  name: z.string(),
});

export const CreateTeamResSchema = z.object({
  name: z.string(),
});

export const GetTeamListResSchema = z.array(
  z.object({
    name: z.string(),
    id: z.string().uuid(),
    slug: z.string(),
    createdAt: z.string(),
    ownerId: z.string().uuid(),
    owned: z.boolean(),
  }),
);
