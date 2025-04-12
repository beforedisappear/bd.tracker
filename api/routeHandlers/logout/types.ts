import { z } from 'zod';
import { LogoutReqBodySchema } from './dto';

export type LogoutDto = z.infer<typeof LogoutReqBodySchema>;
export type LogoutResponse = unknown;
