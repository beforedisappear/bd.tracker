import { MoveColumnReqParamsSchema } from './dto';
import { z } from 'zod';

export type MoveColumnReqParamsDto = z.infer<typeof MoveColumnReqParamsSchema>;
