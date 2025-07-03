import { z } from 'zod';
import { BoardActionSchema } from './BoardActionSchema';

export const BoardCreatedActionSchema = z
  .object({ action: z.literal('BOARD_CREATED') })
  .merge(BoardActionSchema);
