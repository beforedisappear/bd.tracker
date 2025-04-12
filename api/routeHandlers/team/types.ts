import { z } from 'zod';
import { CreateTeamReqBodySchema } from './dto';

export type CreateTeamReqDto = z.infer<typeof CreateTeamReqBodySchema>;
