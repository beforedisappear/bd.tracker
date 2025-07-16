import { z } from 'zod';
import { StickerActionSchema } from './StickerActionSchema';

export const StickerDeletedActionSchema = StickerActionSchema.extend({
  action: z.literal('STICKER_DELETED'),
});
