import { z } from 'zod';

export const PostSendChangeEmailReqBodySchema = z.object({
  email: z.string().email(),
});

export type PostSendChangeEmailReqBody = z.infer<
  typeof PostSendChangeEmailReqBodySchema
>;
