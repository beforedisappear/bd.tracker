import { z } from 'zod';
import {
  RenameProjectReqBodySchema,
  RenameProjectReqParamsSchema,
} from './dto';

export type RenameProjectReqParamsDto = z.infer<
  typeof RenameProjectReqParamsSchema
>;

export type RenameProjectReqBodyDto = z.infer<
  typeof RenameProjectReqBodySchema
>;
