import { z } from 'zod';
import { RefreshTokensReqSchema, RefreshTokensResSchema } from './dto';

export type RefreshTokensDto = z.infer<typeof RefreshTokensReqSchema>;
export type RefreshTokensResponse = z.infer<typeof RefreshTokensResSchema>;
