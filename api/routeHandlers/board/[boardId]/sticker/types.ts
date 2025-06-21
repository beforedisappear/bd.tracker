import { z } from 'zod';
import {
  GetStickersReqParamsSchema,
  CreateStickerReqParamsSchema,
  CreateStickerReqBodySchema,
} from './dto';

export type GetStickersReqParams = z.infer<typeof GetStickersReqParamsSchema>;
export type CreateStickerReqParams = z.infer<
  typeof CreateStickerReqParamsSchema
>;
export type CreateStickerReqBody = z.infer<typeof CreateStickerReqBodySchema>;
