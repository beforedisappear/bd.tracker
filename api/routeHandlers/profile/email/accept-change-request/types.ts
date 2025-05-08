import { PostAcceptChangeEmailReqBodySchema } from './dto';
import { z } from 'zod';

export type PostAcceptChangeEmailReqBody = z.infer<
  typeof PostAcceptChangeEmailReqBodySchema
>;
