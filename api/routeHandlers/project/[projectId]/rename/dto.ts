import { z } from 'zod';

export const RenameProjectReqParamsSchema = z.object({
  projectId: z.string(),
});

export const RenameProjectReqBodySchema = z.object({
  name: z.string(),
});

export const RenameProjectResSchema = z.object({
  id: z.string(),
});
