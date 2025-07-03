import { z } from 'zod';

export const RenameBoardDtoReqParams = z.object({
  boardId: z.string(),
});

export const RenameBoardDtoBodyReq = z.object({
  name: z.string(),
});

export const RenameBoardDtoRes = z.object({
  id: z.string(),
  tenantId: z.string(),
});
