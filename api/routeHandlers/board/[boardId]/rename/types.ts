import { z } from 'zod';
import { RenameBoardDtoReqParams } from './dto';

export type RenameBoardDtoReqParamsDto = z.infer<
  typeof RenameBoardDtoReqParams
>;
