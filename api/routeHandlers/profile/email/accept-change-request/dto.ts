import { z } from 'zod';

export const PostAcceptChangeEmailReqBodySchema = z.object({
  token: z.string(),
  requestId: z.string().uuid(),
});
