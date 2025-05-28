import { DeleteColumnByIdReqParamsSchema } from './dto';
import { z } from 'zod';

export type DeleteColumnByIdReqParamsDto = z.infer<
  typeof DeleteColumnByIdReqParamsSchema
>;
