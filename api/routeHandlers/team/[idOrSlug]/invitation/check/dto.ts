import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const CheckInvitationExistsReqParamsSchema = z.object({
  idOrSlug: z.string().uuid(),
});

export const CheckInvitationExistsReqBodySchema = z.object({
  idOrSlug: z.string().uuid(),
  inviteeEmail: z.string().email(),
});

export const CheckInvitationExistsResSchema = z.object({
  exists: z.boolean(),
});
