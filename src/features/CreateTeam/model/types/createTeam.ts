import { z } from 'zod';
import { CreateTeamSchema } from '../schemes';

export type CreateTeam = z.infer<typeof CreateTeamSchema>;
