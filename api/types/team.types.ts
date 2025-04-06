import { z } from 'zod';
import {
  CreateTeamDataReqSchema,
  DeleteTeamDataReqSchema,
  RenameTeamDataReqSchema,
} from '$/dto/team.dto';

export type CreateTeamReqDto = z.infer<typeof CreateTeamDataReqSchema>;

export type RenameTeamReqDto = z.infer<typeof RenameTeamDataReqSchema>;

export type DeleteTeamReqDto = z.infer<typeof DeleteTeamDataReqSchema>;
