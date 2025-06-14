import { z } from 'zod';
import {
  DeleteTaskByIdReqParamsSchema,
  GetTaskByIdDtoReqParamsSchema,
} from './dto';

export type DeleteTaskByIdReqParamsDto = z.infer<
  typeof DeleteTaskByIdReqParamsSchema
>;
export type GetTaskByIdDtoReqParamsDto = z.infer<
  typeof GetTaskByIdDtoReqParamsSchema
>;
