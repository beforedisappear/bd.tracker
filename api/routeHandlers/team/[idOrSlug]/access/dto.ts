import { z } from 'zod';

export const GetHaveAccessToTeamDtoSchema = z.object({
  idOrSlug: z.string(),
});

export const GetHaveAccessToTeamResSchema = z.object({
  inTeam: z.boolean(),
  isAdmin: z.boolean(),
  isOwner: z.boolean(),
  userId: z.string().uuid(),
  tenantId: z.string().uuid(),
});
