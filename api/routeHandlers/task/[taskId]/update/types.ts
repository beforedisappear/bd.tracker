import { z } from 'zod';

import { UpdateTaskDtoReqParamsSchema } from './dto';

export type UpdateTaskDtoReqParamsDto = z.infer<
  typeof UpdateTaskDtoReqParamsSchema
>;
