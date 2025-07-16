import { z } from 'zod';
import { StickerActionSchema } from './StickerActionSchema';

export const StickerUpdatedActionSchema = StickerActionSchema.extend({
  action: z.literal('STICKER_UPDATED'),
});
