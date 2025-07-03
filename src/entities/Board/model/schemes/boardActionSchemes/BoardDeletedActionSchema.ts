import { z } from 'zod';
import { BoardActionSchema } from './BoardActionSchema';

export const BoardDeletedActionSchema = z
  .object({ action: z.literal('BOARD_DELETED') })
  .merge(BoardActionSchema);
