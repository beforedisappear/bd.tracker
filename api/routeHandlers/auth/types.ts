import { z } from 'zod';
import { AuthReqBodySchema } from './dto';

export type AuthDto = z.infer<typeof AuthReqBodySchema>;
export type AuthReponse = unknown;
