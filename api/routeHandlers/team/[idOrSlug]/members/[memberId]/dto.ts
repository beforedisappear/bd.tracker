import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const GetTeamMemberByIdReqParamsSchema = z.object({
  idOrSlug: z.string(),
  memberId: z.string().uuid(),
});

export const GetTeamMemberByIdResSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  email: z.string().email(),
  isOwner: z.boolean(),
  isAdmin: z.boolean(),
});

export const RemoveTeamMemberByIdReqParamsSchema = z.object({
  idOrSlug: z.string(),
  memberId: z.string().uuid(),
});
