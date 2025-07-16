import { z } from 'zod';
import { StickerActionSchema } from './StickerActionSchema';

export const StickerCreatedActionSchema = StickerActionSchema.extend({
  action: z.literal('STICKER_CREATED'),
});
