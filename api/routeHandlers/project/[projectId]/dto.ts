import { z } from 'zod';

export const DeleteProjectReqParamsSchema = z.object({
  projectId: z.string(),
});

export const DeleteProjectResSchema = z.object({
  id: z.string(),
});

export const GetProjectByIdReqParamsSchema = z.object({
  projectId: z.string(),
});

// export const GetProjectByIdResSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   createdAt: z.string(),
//   teamId: z.string(),
// });
