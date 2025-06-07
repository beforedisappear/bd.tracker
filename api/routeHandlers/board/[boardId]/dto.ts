import { z } from 'zod';

export const GetBoardByIdReqParamsSchema = z.object({
  boardId: z.string(),
});

export const GetBoardByIdResSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const DeleteBoardByIdReqParamsSchema = z.object({
  boardId: z.string(),
});
