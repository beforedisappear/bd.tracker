import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const InviteUserToTeamReqParamsSchema = z.object({
  idOrSlug: z.string(),
});

export const InviteUserToTeamReqBodySchema = z.object({
  inviteeEmail: z.string().email(),
});

export const InviteUserToTeamResSchema = z.object({
  invitationId: z.string().uuid(),
});
