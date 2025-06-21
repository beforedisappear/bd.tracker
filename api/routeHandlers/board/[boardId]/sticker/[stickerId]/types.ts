import { z } from 'zod';
import {
  UpdateStickerReqParamsSchema,
  UpdateStickerReqBodySchema,
  DeleteStickerReqParamsSchema,
} from './dto';

export type UpdateStickerReqParams = z.infer<
  typeof UpdateStickerReqParamsSchema
>;
export type UpdateStickerReqBody = z.infer<typeof UpdateStickerReqBodySchema>;
export type DeleteStickerReqParams = z.infer<
  typeof DeleteStickerReqParamsSchema
>;
