import { z } from 'zod';

export const CreateProjectReqBodySchema = z.object({
  teamIdOrSlug: z.string(),
  name: z.string(),
  membersIds: z.array(z.string()).optional(),
});

export const CreateProjectResSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  name: z.string(),
  createdAt: z.string(),
});

export const GetAllProjectsResSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.string(),
    teamId: z.string().uuid(),
    members: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    ),
    firstBoardId: z.string(),
  }),
);

export const GetAllTeamProjectsReqQuerySchema = z.object({
  teamIdOrSlug: z.string(),
});
