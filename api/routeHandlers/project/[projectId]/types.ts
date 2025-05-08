import {
  DeleteProjectReqParamsSchema,
  GetProjectByIdReqParamsSchema,
  GetProjectByIdResSchema,
} from './dto';
import { z } from 'zod';

export type DeleteProjectReqParamsDto = z.infer<
  typeof DeleteProjectReqParamsSchema
>;

export type GetProjectByIdReqParamsDto = z.infer<
  typeof GetProjectByIdReqParamsSchema
>;

export type GetProjectByIdResDto = z.infer<typeof GetProjectByIdResSchema>;
