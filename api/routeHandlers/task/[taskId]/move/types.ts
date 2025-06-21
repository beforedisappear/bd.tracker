import { z } from 'zod';

import { MoveTaskDtoReqBodySchema, MoveTaskDtoReqParamsSchema } from './dto';

export type MoveTaskDtoReqBodyDto = z.infer<typeof MoveTaskDtoReqBodySchema>;

export type MoveTaskDtoReqParamsDto = z.infer<
  typeof MoveTaskDtoReqParamsSchema
>;
