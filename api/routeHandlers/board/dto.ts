import { z } from 'zod';

export const CreateBoardReqBodySchema = z.object({
  projectId: z.string(),
  name: z.string(),
});

export const CreateBoardResSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GetProjectBoardsReqQuerySchema = z.object({
  projectId: z.string(),
});

export const GetProjectBoardsResSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    projectId: z.string(),
    tenantId: z.string(),
    columnMoveCount: z.number(),
    createdAt: z.string(),
  }),
);
