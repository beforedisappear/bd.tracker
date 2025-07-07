import { z } from 'zod';
import { BoardSchema } from 'api/schemes/board';

export const RenameBoardDtoReqParams = z.object({
  boardId: z.string(),
});

export const RenameBoardDtoBodyReq = z.object({
  name: z.string(),
});

export const RenameBoardDtoRes = BoardSchema;
