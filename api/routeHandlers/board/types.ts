import { z } from 'zod';
import {
  CreateBoardReqBodySchema,
  GetProjectBoardsReqQuerySchema,
  GetProjectBoardsResSchema,
} from './dto';

export type CreateBoardReqBodyDto = z.infer<typeof CreateBoardReqBodySchema>;

export type GetProjectBoardsReqQueryDto = z.infer<
  typeof GetProjectBoardsReqQuerySchema
>;

export type GetProjectBoardsResDto = z.infer<typeof GetProjectBoardsResSchema>;
