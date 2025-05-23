import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const AcceptInvitationToTeamReqBodySchema = z.object({
  invitationId: z.string().uuid(),
  token: z.string(),
});
