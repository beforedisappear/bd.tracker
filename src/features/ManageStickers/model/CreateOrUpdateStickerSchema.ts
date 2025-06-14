import { z } from 'zod';
import { REQUIRED_FIELD_MESSAGE } from '@/shared/constants';

export const CreateOrUpdateStickerSchema = z.object({
  name: z
    .string({
      required_error: REQUIRED_FIELD_MESSAGE,
    })
    .min(1, REQUIRED_FIELD_MESSAGE),
});
