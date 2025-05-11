import { z } from 'zod';

export const GetHaveAccessToTeamDtoSchema = z.object({
  idOrSlug: z.string(),
});

export const GetHaveAccessToTeamResSchema = z.object({
  haveAccess: z.boolean(),
});
