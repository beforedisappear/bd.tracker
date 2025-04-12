import { z } from 'zod';
import { LoginReqBodySchema, LoginResSchema } from './dto';

export type LoginDto = z.infer<typeof LoginReqBodySchema>;
export type LoginResponse = z.infer<typeof LoginResSchema>;
