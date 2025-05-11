import { z } from 'zod';

import { GetHaveAccessToTeamDtoSchema } from './dto';

export type GetHaveAccessToTeamDto = z.infer<
  typeof GetHaveAccessToTeamDtoSchema
>;
