import { z } from 'zod';

import { MoveTaskDtoReqBodySchema } from './dto';

export type MoveTaskDtoReqBodyDto = z.infer<typeof MoveTaskDtoReqBodySchema>;
