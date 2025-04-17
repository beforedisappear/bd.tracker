import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const AcceptInvitationToTeamReqQuerySchema = z.object({
  invitationId: z.string().uuid(),
  token: z.string(),
});
