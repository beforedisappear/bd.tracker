import { z } from 'zod';
import {
  GetBoardByIdReqParamsSchema,
  DeleteBoardByIdReqParamsSchema,
} from './dto';

export type GetBoardByIdReqParamsDto = z.infer<
  typeof GetBoardByIdReqParamsSchema
>;

export type DeleteBoardByIdReqParamsDto = z.infer<
  typeof DeleteBoardByIdReqParamsSchema
>;
