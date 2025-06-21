import { RenameColumnReqBodySchema, RenameColumnReqParamsSchema } from './dto';
import { z } from 'zod';

export type RenameColumnReqBodyDto = z.infer<typeof RenameColumnReqBodySchema>;

export type RenameColumnReqParamsDto = z.infer<
  typeof RenameColumnReqParamsSchema
>;
