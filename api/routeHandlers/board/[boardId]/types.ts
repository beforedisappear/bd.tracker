import { z } from 'zod';
import {
  GetBoardByIdReqParamsSchema,
  DeleteBoardByIdReqParamsSchema,
  GetBoardByIdQuerySchema,
} from './dto';

export type GetBoardByIdReqParamsDto = z.infer<
  typeof GetBoardByIdReqParamsSchema
>;

export type DeleteBoardByIdReqParamsDto = z.infer<
  typeof DeleteBoardByIdReqParamsSchema
>;

export type GetBoardByIdQueryDto = z.infer<typeof GetBoardByIdQuerySchema>;
