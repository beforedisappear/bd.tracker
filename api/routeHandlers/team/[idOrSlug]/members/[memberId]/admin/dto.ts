import { z } from 'zod';

export const SetTeamAdminReqParamsSchema = z.object({
  idOrSlug: z.string(),
  memberId: z.string().uuid(),
});

export const RemoveTeamAdminReqParamsSchema = z.object({
  idOrSlug: z.string(),
  memberId: z.string().uuid(),
});
