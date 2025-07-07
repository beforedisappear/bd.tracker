import { z } from 'zod';
import { BoardActionSchema } from './BoardActionSchema';

export const BoardUpdatedActionSchema = z
  .object({ action: z.literal('BOARD_UPDATED') })
  .merge(BoardActionSchema);
