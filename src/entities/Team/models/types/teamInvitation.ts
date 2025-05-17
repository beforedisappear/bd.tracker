import { z } from 'zod';
import { InviteToTeamSchema } from '../schemes/InviteToTeamSchema';

export type InviteToTeamDtoRes = {
  result: 'notification' | 'proposal';
};

export interface InviteToTeamDtoReq extends z.infer<typeof InviteToTeamSchema> {
  teamIdOrSlug: string;
}
