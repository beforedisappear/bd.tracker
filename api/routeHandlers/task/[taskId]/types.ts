import { z } from 'zod';
import { DeleteTaskByIdReqParamsSchema } from './dto';

export type DeleteTaskByIdReqParamsDto = z.infer<
  typeof DeleteTaskByIdReqParamsSchema
>;
