import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const InviteUserToTeamReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const InviteUserToTeamReqBodySchema = z.object({
  inviteeEmail: z.string().email(),
  projectIds: z.array(z.string()).optional(),
});

export const InviteUserToTeamResSchema = z.object({
  invitationId: z.string().uuid(),
});
